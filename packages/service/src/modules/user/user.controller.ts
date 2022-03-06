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
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignDto } from './dto/sign.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly _userSrv: UserService) {}

  @Post('avatar')
  @ApiBody({
    description: 'user avatar',
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Session() session: Record<string, any>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this._userSrv.updateAvatar(
      session.client,
      file,
      session.userId,
    );
  }

  @Post()
  @ApiOperation({
    summary: '用户登录/注册',
  })
  public async signUser(
    @Body() userProfile: SignDto,
    @Session() session: Record<string, any>,
  ) {
    // B端
    if (session.client === process.env.PIEMALL_ADMIN) {
      // 登录
      if (userProfile.signType === 'in') {
        return await this._userSrv.adminLogin(userProfile, session);
      }
      // 注册
      if (userProfile.signType === 'up') {
        return await this._userSrv.adminRegister(userProfile);
      }
    }
    // C端
    // if (session.client === process.env.PIEMALL_APP) {
    //
    // }
  }

  @Get()
  @ApiOperation({
    summary: '校验ticket并获取userProfile',
  })
  public async getUserProfile(
    @Headers('userTicket') token: string,
    @Session() session: Record<string, any>,
  ) {
    const { userId } = session;
    return await this._userSrv.getUserProfile(token, userId);
  }

  @Delete('userSession')
  @ApiOperation({
    summary: '用户退出登录，删除用户会话状态',
  })
  public async signOut(
    @Headers('userTicket') token: string,
    @Session() session: Record<string, any>,
  ) {
    return await this._userSrv.deleteUserSession(token, session);
  }
}
