import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Admin } from './entities/admin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthModule } from '../jwt-auth/jwt-auth.module';
import { Guest } from './entities/guest.entity';
import { ReceivingAddress } from './entities/guest-address.entity';
import { StaticResourceService } from '../static-resource/static-resource.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Guest, ReceivingAddress]),
    JwtAuthModule,
  ], // 还未引入Guest
  providers: [UserService, StaticResourceService],
  controllers: [UserController],
})
export class UserModule {}
