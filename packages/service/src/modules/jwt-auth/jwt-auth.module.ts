import { Module } from '@nestjs/common';
import { AuthService } from './jwt-auth.service';
import { AuthController } from './jwt-auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
