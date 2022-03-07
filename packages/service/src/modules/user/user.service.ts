import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
// import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../response/response-service';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { SignDto } from './dto/sign.dto';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { UserProfileInterface } from '../../../../types/user/user-profile.interface';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private readonly _adminRepo: Repository<Admin>,
    // @InjectRepository(Guest)
    // private readonly __appUserRepo: Repository<Guest>,
    private readonly _responseSrv: ResponseService,
    private readonly _jwtSrv: JwtAuthService,
  ) {}

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
    try {
      await this[_userRepo].update(userId, {
        name: name,
      });
      return this._responseSrv.success({});
    } catch (err) {
      return this._responseSrv.error(ERROR_TYPE.UNKNOW, err, {
        detail: err.toString(),
      });
    }
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

    try {
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
    } catch (err) {
      return this._responseSrv.error(ERROR_TYPE.UNKNOW, err, {
        detail: err.toString(),
      });
    }
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
    try {
      // 验证session，只有二次登录，session中才有该字段
      if (!userId) {
        throw Error('身份认证失败, 您没有权限执行此操作');
      }
      // 1. 验证token
      const verifyRes = await this._jwtSrv.verifyAccessToken(token);

      if (!verifyRes) {
        throw Error('身份认证失败, 您没有权限执行此操作');
      }
      // 通过身份认证校验
      const userProfile = await this.getUserProfileById(userId);
      if (!userProfile) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, null);
      }
      return this._responseSrv.success(userProfile);
    } catch (err) {
      return this._responseSrv.error(ERROR_TYPE.UNKNOW, err, {
        detail: err.toString(),
      });
    }
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
    //   : this.__appUserRepo.findOne({ id: userId });
    return await this._adminRepo.findOne({ id: userId });
  }

  /**
   * admin 登录
   * @param {SignAdminDto} adminUserProfile
   * @returns ResponseBody
   */
  public async adminLogin(
    adminUserProfile: SignDto,
    session: Record<string, any>,
  ): Promise<ResponseBody<any>> {
    const { account, password } = adminUserProfile;
    try {
      // const user = await this._adminRepo.findOne({
      //   where: { account: account, password: password },
      // });
      const user = await this._adminRepo.findOne({
        account,
        password,
      });
      if (!user) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, null);
      }
      const { name, id } = user;
      session.userId = id;
      const access_token = await this._jwtSrv.signAccessToken(id);
      return this._responseSrv.success({ userProfile: { name }, access_token });
    } catch (err) {
      console.log(err);
      return this._responseSrv.error(ERROR_TYPE.UNKNOW, null, {
        detail: err.toString(),
      });
    }
  }

  /**
   * admin 注册
   * @param {SignAdminDto} adminUserProfile
   * @returns ResponseBody
   */
  public async adminRegister(
    adminUserProfile: SignDto,
  ): Promise<ResponseBody<any>> {
    try {
      const { account } = adminUserProfile;
      const user = await this._adminRepo.findOne({ account });
      // 账号已存在
      if (user) {
        return this._responseSrv.error(ERROR_TYPE.ALREADY_EXIST, null);
      }
      const rec = await this._adminRepo.save(adminUserProfile);
      const { name } = rec;
      return this._responseSrv.success({ name });
    } catch (err) {
      console.log(err);
      return this._responseSrv.error(ERROR_TYPE.UNKNOW, null, {
        detail: err.toString(),
      });
    }
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
    try {
      session.destroy();
      return this._responseSrv.success({});
    } catch (err) {
      console.log(err);
      return this._responseSrv.error(ERROR_TYPE.UNKNOW, null, {
        detail: err.toString(),
      });
    }
  }

  /**
   * app 登录
   * @param {SignAdminDto} appUserProfile
   * @returns ResponseBody
   */
  // public async appUserLogin(
  //   appUserProfile: SignDto,
  // ): Promise<ResponseBody<any>> {
  //   try {
  //     const rec = await this._appUserRepo.save(appUserProfile);
  //     return this._responseSrv.success(rec);
  //   } catch (err) {
  //     console.log(err);
  //     return this._responseSrv.error(ERROR_TYPE.UNKNOW, null, {
  //       detail: err.toString(),
  //     });
  //   }
  // }

  /**
   * app 注册
   * @param {SignAdminDto} appUserProfile
   * @returns ResponseBody
   */
  // public async appUserRegister(
  //   appUserProfile: SignDto,
  // ): Promise<ResponseBody<any>> {
  //   try {
  //     const rec = await this._appUserRepo.save(appUserProfile);
  //     return this._responseSrv.success(rec);
  //   } catch (err) {
  //     console.log(err);
  //     return this._responseSrv.error(ERROR_TYPE.UNKNOW, null, {
  //       detail: err.toString(),
  //     });
  //   }
  // }
}
