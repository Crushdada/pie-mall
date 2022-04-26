import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  Session,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignDto } from './dto/sign.dto';
import { addGuestDto } from './dto/add-guest.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { insertAddressDto } from './dto/insert-address.dto';
import { updateAddressDto } from './dto/update-address.dto';
@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly _userSrv: UserService) {}

  @Get('analysis')
  getUserAnalysisData() {
    return this._userSrv.getUserAnalysisData();
  }

  @Delete('address/:id')
  @ApiOperation({
    summary: 'app端用户删除一条收货地址',
  })
  deleteAddress(
    @Session() session: Record<string, any>,
    @Param('id') addressId: string,
  ) {
    const { userId } = session?.userProfile;
    return this._userSrv.deleteAddress(userId, addressId);
  }

  @Post('address')
  @ApiOperation({
    summary: 'app端用户新增一条收货地址',
  })
  insertAddress(
    @Session() session: Record<string, any>,
    @Body() addressInfo: insertAddressDto,
  ) {
    const { userId } = session?.userProfile;
    return this._userSrv.insertAddress(userId, addressInfo);
  }

  @Put('address')
  @ApiOperation({
    summary: 'app端用户编辑更新一条收货地址',
  })
  updateAddress(@Body() addressInfo: updateAddressDto) {
    return this._userSrv.updateAddress(addressInfo);
  }

  @Get('address')
  @ApiOperation({
    summary: 'app端获取当前用户的默认收货地址及收货地址列表',
  })
  findAddresses(@Session() session: Record<string, any>) {
    const { userId } = session?.userProfile;
    return this._userSrv.findAddresses(userId);
  }

  @Patch('default-address/:id')
  @ApiOperation({
    summary: '更新用户默认地址',
  })
  updateUserDefaultAddress(
    @Param('id') defaultAddressId: string,
    @Session() session: Record<string, any>,
  ) {
    const { userId } = session?.userProfile;
    return this._userSrv.setDefaultAddress(userId, defaultAddressId);
  }

  @Post('guest')
  @ApiOperation({
    summary: '后台添加app用户',
  })
  addGuest(@Body() { userProfile }: { userProfile: addGuestDto }) {
    return this._userSrv.addGuest(userProfile);
  }

  @Delete('guests')
  @ApiOperation({
    summary: '注销app用户',
  })
  deleteGuests(@Body() { ids }: { ids: string[] }) {
    return this._userSrv.deleteGuestsByIds(ids);
  }

  @Get('guests')
  @ApiOperation({
    summary: '获取所有app用户信息',
  })
  getGuests() {
    return this._userSrv.getProfilesOfGuests();
  }

  @Post('name')
  @ApiOperation({
    summary: '修改用户昵称',
  })
  updateUserName(
    @Body() { userName }: { userName: string },
    @Session() session: Record<string, any>,
  ) {
    const { client, userProfile } = session;
    const { userId } = userProfile;
    return this._userSrv.setUserName(client, userName, userId);
  }

  @Post('avatar')
  @ApiBody({
    description: 'user avatar',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Session() session: Record<string, any>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { client, userProfile } = session;
    const { userId } = userProfile;
    return this._userSrv.updateAvatar(client, file, userId);
  }

  @Post()
  @ApiOperation({
    summary: '用户登录/注册',
  })
  signUser(
    @Body() userProfile: SignDto,
    @Session() session: Record<string, any>,
  ) {
    // 登录
    if (userProfile.signType === 'in') {
      return this._userSrv.userLogin(userProfile, session);
    }
    // 注册
    if (userProfile.signType === 'up') {
      return this._userSrv.userRegister(userProfile, session.client);
    }
  }

  @Get()
  @ApiOperation({
    summary: '校验ticket并获取userProfile',
  })
  getUserProfile(
    @Headers('userTicket') token: string,
    @Session() session: Record<string, any>,
  ) {
    return this._userSrv.getUserProfile(token, session);
  }

  @Delete('userSession')
  @ApiOperation({
    summary: '用户退出登录，删除用户会话状态',
  })
  signOut(
    @Headers('userTicket') token: string,
    @Session() session: Record<string, any>,
  ) {
    return this._userSrv.deleteUserSession(token, session);
  }
}
