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
import { CreateShopCartDto } from './dto/create-shop-cart.dto';

@Controller('shop-cart')
export class ShopCartController {
  constructor(private readonly _shopCartSrv: ShopCartService) {}

  @Post()
  create(@Body() createShopCartDto: CreateShopCartDto) {
    return this._shopCartSrv.create(createShopCartDto);
  }

  @Get()
  findAll() {
    return this._shopCartSrv.findAll();
  }

  @Get('/goods-map/:id')
  findGoodsMapOrNot(@Session() session, @Param('id') goodsId: string) {
    const { shopcartId } = session.userProfile;
    return this._shopCartSrv.findGoodsMapOrNot(shopcartId, goodsId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._shopCartSrv.findOne(id);
  }

  @Patch(':id')
  update(
    @Session() session,
    @Param('id') goodsId: string,
    @Body() { newQuantity }: { newQuantity: number },
  ) {
    const { shopcartId } = session.userProfile;
    return this._shopCartSrv.update(shopcartId, goodsId, newQuantity);
  }

  @Delete(':id')
  deleteById(@Session() session, @Param('id') id: string) {
    const { shopcartId } = session.userProfile;
    return this._shopCartSrv.delete(shopcartId, id);
  }

  @Delete()
  deleteByIds(@Session() session, @Body() delIds: Array<string>) {
    const { shopcartId } = session.userProfile;
    return this._shopCartSrv.delete(shopcartId, delIds);
  }
}
