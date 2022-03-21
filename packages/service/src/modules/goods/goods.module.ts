import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { Goods } from './entities/goods.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaticResourceService } from '../static-resource/static-resource.service';

@Module({
  imports: [TypeOrmModule.forFeature([Goods])],
  providers: [GoodsService, StaticResourceService],
  controllers: [GoodsController],
})
export class GoodsModule {}
