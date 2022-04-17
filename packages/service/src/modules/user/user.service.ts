import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Entity, Repository } from 'typeorm';
import { ResponseService } from '../response/response-service';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { SignDto } from './dto/sign.dto';
import { JwtAuthService } from '../jwt-auth/jwt-auth.service';
import { UserProfileInterface } from '../../../../types/user/user-profile.interface';
import { Guest } from './entities/guest.entity';
import { ReceivingAddress } from './entities/guest-address.entity';
import { StaticResourceService } from '../static-resource/static-resource.service';
import { ShopCart } from '../shop-cart/entities/shop-cart.entity';
import { insertAddressDto } from './dto/insert-address.dto';
import { updateAddressDto } from './dto/update-address.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private readonly _adminRepo: Repository<Admin>,
    @InjectRepository(Guest)
    private readonly _guestRepo: Repository<Guest>,
    @InjectRepository(ShopCart)
    private readonly _shopCartRepo: Repository<ShopCart>,
    @InjectRepository(ReceivingAddress)
    private readonly _guestAddressRepo: Repository<ReceivingAddress>,
    private readonly _responseSrv: ResponseService,
    private readonly _jwtSrv: JwtAuthService,
    private readonly _staticResourceSrv: StaticResourceService,
  ) {}

  /**
   * app端用户删除一条收货地址
   * @param userId
   * @param addressId
   */
  deleteAddress(userId: string, addressId: string) {
    return this._responseSrv.tryExecute(async () => {
      const guest = await this._guestRepo.findOne({
        where: { id: userId },
        relations: ['receiving_address'],
      });
      guest.receiving_address = guest.receiving_address.filter(
        address => address.id !== addressId,
      );
      await this._guestRepo.save(guest);
      return this._responseSrv.success(null);
    });
  }

  /**
   * 用户选择默认收货地址
   * @param userId
   * @param defaultAddressId
   */
  setDefaultAddress(userId: string, defaultAddressId: string) {
    return this._responseSrv.tryExecute(async () => {
      const guest = await this._guestRepo.findOne(userId);
      const address = await this._guestAddressRepo.findOne(defaultAddressId);
      guest.default_address = address;
      await this._guestRepo.save(guest);
      return this._responseSrv.success(null);
    });
  }

  /**
   * 用户编辑更新收货地址
   * @param userId
   * @param addressInfo
   */
  updateAddress(addressInfo: updateAddressDto) {
    return this._responseSrv.tryExecute(async () => {
      await this._guestAddressRepo.save(addressInfo);
      return this._responseSrv.success(null);
    });
  }

  /**
   * 用户新增收货地址
   * @param userId
   * @param addressInfo
   */
  insertAddress(userId: string, addressInfo: insertAddressDto) {
    return this._responseSrv.tryExecute(async () => {
      const guest = await this._guestRepo.findOne(userId);
      const newAddress = await this._guestAddressRepo.save({
        ...addressInfo,
        user: guest,
      });
      guest.default_address = newAddress;
      await this._guestRepo.save(guest);
      return this._responseSrv.success(null);
    });
  }

  /**
   * 查询用户的默认收货地址及收货地址列表
   * @param userId
   * @returns { string } defaultAddress
   * @returns { Array<string> } addressList
   */
  findAddresses(userId: string) {
    return this._responseSrv.tryExecute(async () => {
      const guest = await this._guestRepo.findOne({
        where: { id: userId },
        relations: ['receiving_address'],
      });
      let { default_address: defaultAddress } = guest;
      const { receiving_address: addressList } = guest;
      if (!defaultAddress && addressList.length !== 0) {
        guest.default_address = addressList[0];
        defaultAddress = addressList[0];
        this._guestRepo.save(guest);
      }
      return this._responseSrv.success({ defaultAddress, addressList });
    });
  }

  /**
   * 后台添加app端用户
   * @param userProfile
   * @returns
   */
  addGuest(userProfile: Partial<UserProfileInterface>) {
    return this._responseSrv.tryExecute(async () => {
      const guest = await this.addUser(userProfile, this._guestRepo);
      // 账号已存在
      if (!guest) {
        return this._responseSrv.error(ERROR_TYPE.ALREADY_EXIST, null);
      }
      const { address } = userProfile;
      // userId 作为地址表的外键
      const createdAddress = await this._guestAddressRepo.create({
        address,
        user: guest,
      });
      guest.default_address = createdAddress;
      await this._guestRepo.save(guest);
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
  async addUser(
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
      await this._guestRepo.delete(ids);
      return this._responseSrv.success({});
    });
  }

  /**
   * 获取app端全部用户信息
   * @returns guestArray
   */
  getProfilesOfGuests() {
    return this._responseSrv.tryExecute(async () => {
      const guests = await this._guestRepo.find({
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
  setUserName(client: string, name: string, userId: string) {
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
  updateAvatar(
    client: string,
    file: Express.Multer.File,
    userId: string,
  ): Promise<ResponseBody<{ userAvatarUrl: string }>> {
    const avatarFileName = `${userId}.jpg`;
    const resourceDir = '/user-avatar';

    return this._responseSrv.tryExecute(async () => {
      const _userRepo = {
        [process.env.PIEMALL_APP]: '_appUserRepo',
        [process.env.PIEMALL_ADMIN]: '_adminRepo',
      }[client];
      const userAvatarUrl = this._staticResourceSrv.storageService(
        file,
        resourceDir,
        avatarFileName,
      );
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
  getUserProfile(
    token: string,
    session: Record<string, any>,
  ): Promise<ResponseBody<any>> {
    return this._responseSrv.tryExecute(async () => {
      const { client } = session;
      const userId = session?.userProfile?.userId;
      // 验证session，只有二次登录，session中才有该字段
      if (!userId) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: '🙈登录状态失效，请重新登录',
        });
      }
      // 1. 验证token
      const verifyRes = await this._jwtSrv.verifyAccessToken(token);

      if (!verifyRes) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: '🙈登录状态失效，请重新登录',
        });
      }
      // 通过身份认证校验
      const _userRepo = {
        [process.env.PIEMALL_APP]: '_guestRepo',
        [process.env.PIEMALL_ADMIN]: '_adminRepo',
      }[client];
      const userProfiles = await this.getUserProfileById(
        userId,
        this[_userRepo],
      );
      if (!userProfiles) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, null);
      }
      return this._responseSrv.success(userProfiles);
    });
  }
  /**
   *
   * @param userId
   * @returns userProfile
   */
  getUserProfileById(
    userId: string,
    repo: Repository<any>,
  ): Promise<UserProfileInterface> {
    return this._responseSrv.tryExecute(async () => {
      return await repo.findOne({ id: userId });
    });
  }

  /**
   * 登录
   * @param {SignAdminDto} userProfile
   * @returns ResponseBody
   */
  userLogin(
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
      const { name, id, shop_cart } = user;
      session.userProfile = {};
      if (session.client === process.env.PIEMALL_APP) {
        if (!shop_cart) {
          user.shop_cart = this._shopCartRepo.create();
          this._guestRepo.save(user);
        }
        const { id: shopcartId } = user.shop_cart;
        session.userProfile.shopcartId = shopcartId;
      }
      session.userProfile.userId = id;
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
  userRegister(
    userProfile: SignDto,
    client: string,
  ): Promise<ResponseBody<any>> {
    return this._responseSrv.tryExecute(() => {
      const _userRepo = {
        [process.env.PIEMALL_APP]: this._guestRepo,
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
  deleteUserSession(
    token: string,
    session: Record<string, any>,
  ): Promise<ResponseBody<any>> {
    return this._responseSrv.tryExecute(async () => {
      session.destroy();
      return this._responseSrv.success({});
    });
  }
}
