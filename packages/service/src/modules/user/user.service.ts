import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../response/response-service';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { SignDto } from './dto/sign.dto';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { UserProfileInterface } from '../../../../types/user/user-profile.interface';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Guest } from './entities/guest.entity';
import { ReceivingAddress } from './entities/guest-address.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private readonly _adminRepo: Repository<Admin>,
    @InjectRepository(Guest)
    private readonly __guestRepo: Repository<Guest>,
    @InjectRepository(ReceivingAddress)
    private readonly __guestAddressRepo: Repository<ReceivingAddress>,
    private readonly _responseSrv: ResponseService,
    private readonly _jwtSrv: JwtAuthService,
  ) {}

  /**
   * 后台添加app端用户
   * @param userProfile
   * @returns
   */
  public async addGuest(userProfile: Partial<UserProfileInterface>) {
    return this._responseSrv.tryExecute(async () => {
      const guest = await this.addUser(userProfile, this.__guestRepo);
      // 账号已存在
      if (!guest) {
        return this._responseSrv.error(ERROR_TYPE.ALREADY_EXIST, null);
      }
      const { address } = userProfile;
      // userId 作为地址表的外键
      const exeResult = await this.__guestAddressRepo.insert({
        address,
        user: guest,
      });
      if (!exeResult) {
        return this._responseSrv.error(ERROR_TYPE.UNKNOW, null);
      }
      // 添加账户成功
      return this._responseSrv.success({});
    });
  }

  /**
   * 向指定user表添加一个用户的工具方法
   * @param userProfile
   * @param repo
   * @returns row | false
   */
  public async addUser(
    userProfile: Partial<UserProfileInterface>,
    repo: Repository<any>,
  ) {
    const { account } = userProfile;
    const user = await repo.findOne({ account });
    // 账号已存在
    if (user) {
      return false;
    }
    // 添加账户成功
    return await repo.save(userProfile);
  }

  /**
   * 批量注销app端用户
   * @param ids
   * @returns
   */
  deleteGuestsByIds(ids: string[]) {
    return this._responseSrv.tryExecute(async () => {
      console.log(ids);
      const exeResult = await this.__guestRepo.delete(ids);
      console.log(exeResult);
      return this._responseSrv.success({});
    });
  }

  /**
   * 获取app端全部用户信息
   * @returns guestArray
   */
  async getProfilesOfGuests() {
    return this._responseSrv.tryExecute(async () => {
      const guests = await this.__guestRepo.find({
        select: ['id', 'account', 'name', 'role'],
        relations: ['receiving_address'],
      });
      const processAddressGuests = guests.map(guest => ({
        ...guest,
        receiving_address: guest.receiving_address.map(addressRow => ({
          address_id: addressRow.id,
          address: addressRow.address,
        })),
      }));
      return this._responseSrv.success({ guests: processAddressGuests });
    });
  }

  /**
   * 更新用户名称
   * @param client
   * @param name
   * @param userId
   */
  public async setUserName(client: string, name: string, userId: string) {
    const _userRepo = {
      [process.env.PIEMALL_APP]: '_appUserRepo',
      [process.env.PIEMALL_ADMIN]: '_adminRepo',
    }[client];

    return this._responseSrv.tryExecute(async () => {
      await this[_userRepo].update(userId, {
        name: name,
      });
      return this._responseSrv.success({});
    });
  }

  /**
   * 更新用户头像
   * @param client
   * @param file
   * @param userId
   * @returns
   */
  public async updateAvatar(
    client: string,
    file: Express.Multer.File,
    userId: string,
  ): Promise<ResponseBody<{ userAvatarUrl: string }>> {
    const staticSrvDir = process.env.SSD; // 静态服务存储目录
    const serviceRort = process.env.PIEMALL_SERVICE_PORT;
    const avatarFileName = `${userId}.jpg`;
    /**
     * project-path\dist\service\public\upload\user-avatar
     */
    const avatarStorePath = join(
      __dirname,
      '../../../',
      staticSrvDir,
      '/user-avatar',
    );
    return this._responseSrv.tryExecute(async () => {
      // 创建静态资源存储服务路径(文件夹)
      if (!existsSync(avatarStorePath))
        mkdirSync(avatarStorePath, { recursive: true }); // 递归参数，否则只能建一层
      // 存储图片到静态服务目录
      writeFileSync(join(avatarStorePath, avatarFileName), file.buffer);
      // 写入图片存储路径到DB(userProfile)
      const _userRepo = {
        [process.env.PIEMALL_APP]: '_appUserRepo',
        [process.env.PIEMALL_ADMIN]: '_adminRepo',
      }[client];
      const userAvatarUrl = `http://localhost:${serviceRort}/user-avatar/${avatarFileName}`;
      await this[_userRepo].update(userId, {
        avatar: userAvatarUrl,
      });
      return this._responseSrv.success({ userAvatarUrl });
    });
  }

  /**
   * 校验ticket并获取userProfile
   * @param token
   * @param userId
   * @returns
   */
  public async getUserProfile(
    token: string,
    userId: string,
  ): Promise<ResponseBody<any>> {
    return this._responseSrv.tryExecute(async () => {
      // 验证session，只有二次登录，session中才有该字段
      if (!userId) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: '身份认证失败, 您没有权限执行此操作',
        });
      }
      // 1. 验证token
      const verifyRes = await this._jwtSrv.verifyAccessToken(token);

      if (!verifyRes) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: '身份认证失败, 您没有权限执行此操作',
        });
      }
      // 通过身份认证校验
      const userProfile = await this.getUserProfileById(userId);
      if (!userProfile) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, null);
      }
      return this._responseSrv.success(userProfile);
    });
  }
  /**
   *
   * @param userId
   * @returns userProfile
   */
  public async getUserProfileById(
    userId: string,
    // project: 'B' | 'C',
  ): Promise<UserProfileInterface> {
    // return project === 'B'
    //   ? this._adminRepo.findOne({ id: userId })
    //   : this.__guestRepo.findOne({ id: userId });
    return await this._adminRepo.findOne({ id: userId });
  }

  /**
   * 登录
   * @param {SignAdminDto} userProfile
   * @returns ResponseBody
   */
  public async userLogin(
    userProfile: SignDto,
    session: Record<string, any>,
  ): Promise<ResponseBody<any>> {
    const { account, password } = userProfile;
    return this._responseSrv.tryExecute(async () => {
      const _userRepo = {
        [process.env.PIEMALL_APP]: '_guestRepo',
        [process.env.PIEMALL_ADMIN]: '_adminRepo',
      }[session.client];
      const user = await this[_userRepo].findOne({
        account,
        password,
      });
      if (!user) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, null);
      }
      const { name, id } = user;
      session.userId = id;
      const access_token = await this._jwtSrv.signAccessToken(id);
      return this._responseSrv.success({
        userProfile: { name },
        access_token,
      });
    });
  }

  /**
   * 注册
   * @param {SignAdminDto} userProfile
   * @returns ResponseBody
   */
  public userRegister(
    userProfile: SignDto,
    client: string,
  ): Promise<ResponseBody<any>> {
    return this._responseSrv.tryExecute(() => {
      const _userRepo = {
        [process.env.PIEMALL_APP]: this.__guestRepo,
        [process.env.PIEMALL_ADMIN]: this._adminRepo,
      }[client];
      _userRepo;
      const exeResult = this.addUser(userProfile, _userRepo);
      // 账号已存在
      if (!exeResult) {
        return this._responseSrv.error(ERROR_TYPE.ALREADY_EXIST, null);
      }
      // 添加账户成功
      return this._responseSrv.success({ userProfile: exeResult });
    });
  }

  /**
   * 删除user session
   * @param token
   * @param session
   * @returns ResponseBody
   */
  public async deleteUserSession(
    token: string,
    session: Record<string, any>,
  ): Promise<ResponseBody<any>> {
    return this._responseSrv.tryExecute(async () => {
      session.destroy();
      return this._responseSrv.success({});
    });
  }
}
