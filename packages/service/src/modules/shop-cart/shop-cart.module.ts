import { Module } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { ShopCartController } from './shop-cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartGoodsMap } from './entities/cart-goods-map.entity';
import { ShopCart } from './entities/shop-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartGoodsMap, ShopCart])],
  controllers: [ShopCartController],
  providers: [ShopCartService],
})
export class ShopCartModule {}
