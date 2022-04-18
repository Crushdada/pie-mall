import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';

@Controller('shop-cart')
export class ShopCartController {
  constructor(private readonly _shopCartSrv: ShopCartService) {}

  @Post('goods')
  create(
    @Session() session: Record<string, any>,
    @Body() { goodsId, newQuantity }: { goodsId: string; newQuantity: number },
  ) {
    const shopcartId = session?.userProfile?.shopcartId;
    return this._shopCartSrv.create(shopcartId, goodsId, newQuantity);
  }

  @Get()
  findAll() {
    return this._shopCartSrv.findAll();
  }

  @Get('/goods-map/:id')
  findGoodsMapOrNot(
    @Session() session: Record<string, any>,
    @Param('id') goodsId: string,
  ) {
    const shopcartId = session?.userProfile?.shopcartId;
    return this._shopCartSrv.findGoodsMapOrNot(shopcartId, goodsId);
  }

  @Get('atom')
  findOne(@Session() session: Record<string, any>) {
    const shopcartId = session?.userProfile?.shopcartId;
    if (shopcartId) return this._shopCartSrv.findOne(shopcartId);
  }

  @Patch(':id')
  update(
    @Param('id') goodsMapId: string,
    @Body() { newQuantity }: { newQuantity: number },
  ) {
    return this._shopCartSrv.update(goodsMapId, newQuantity);
  }

  @Delete(':id')
  deleteById(
    @Session() session: Record<string, any>,
    @Param('id') goodsMapId: string,
  ) {
    const shopcartId = session?.userProfile?.shopcartId;
    return this._shopCartSrv.delete(shopcartId, goodsMapId);
  }

  @Delete()
  deleteByGoodsMapIds(
    @Session() session: Record<string, any>,
    @Body() delIds: Array<string>,
  ) {
    const shopcartId = session?.userProfile?.shopcartId;
    return this._shopCartSrv.delete(shopcartId, delIds);
  }
}
