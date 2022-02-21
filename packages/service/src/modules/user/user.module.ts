import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Admin]), JwtAuthModule], // 还未引入Guest
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
