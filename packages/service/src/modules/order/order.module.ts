import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { UserModule } from '../user/user.module';
import { Guest } from '../user/entities/guest.entity';
import { ShopCartModule } from '../shop-cart/shop-cart.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Order, Guest]),
    UserModule,
    ShopCartModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
