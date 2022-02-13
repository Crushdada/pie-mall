import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
// import { Guest } from './entities/guest.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../response/response-service';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { SignDto } from './dto/sign.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private readonly _adminRepo: Repository<Admin>,
    // @InjectRepository(Guest)
    // private readonly __appUserRepo: Repository<Guest>,
    private readonly _responseSrv: ResponseService,
  ) {}

  /**
   * admin 登录
   * @param {SignAdminDto} adminUserProfile
   * @returns ResponseBody
   */
  public async adminLogin(
    adminUserProfile: SignDto,
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
      const { name } = user;
      return this._responseSrv.success({ name });
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
