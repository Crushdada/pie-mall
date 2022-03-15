import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './entities/goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  providers: [GoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
