import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';

@Controller('shop-cart')
export class ShopCartController {
  constructor(private readonly shopCartService: ShopCartService) {}

  @Post()
  create(@Body() createShopCartDto: CreateShopCartDto) {
    return this.shopCartService.create(createShopCartDto);
  }

  @Get()
  findAll() {
    return this.shopCartService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shopCartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShopCartDto: UpdateShopCartDto) {
    return this.shopCartService.update(+id, updateShopCartDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shopCartService.remove(+id);
  }
}
