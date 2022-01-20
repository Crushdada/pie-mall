import { Module } from '@nestjs/common';
import { AuthService } from './role.service';
import { AuthController } from './role.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
