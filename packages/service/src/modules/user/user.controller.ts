import { Controller, Post, Body, Req } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SignDto } from './dto/sign.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly _userSrv: UserService) {}

  @Post()
  @ApiOperation({
    summary: '用户登录/注册',
  })
  public async signUser(@Body() userProfile: SignDto, @Req() req: Request) {
    const ori = req.get('origin');
    // B端
    if (ori === 'http://localhost:8081') {
      // 登录
      if (userProfile.signType === 'in') {
        return await this._userSrv.adminLogin(userProfile);
      }
      // 注册
      if (userProfile.signType === 'in') {
        return await this._userSrv.adminRegister(userProfile);
      }
    }
    // C端
    // if (ori === 'http://localhost:8080') {
    //
    // }
  }
}
