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
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._shopCartSrv.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShopCartDto: UpdateShopCartDto,
  ) {
    return this._shopCartSrv.update(+id, updateShopCartDto);
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
