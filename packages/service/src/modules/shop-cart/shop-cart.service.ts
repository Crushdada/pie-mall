import { Injectable } from '@nestjs/common';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';

@Injectable()
export class ShopCartService {
  create(createShopCartDto: CreateShopCartDto) {
    return 'This action adds a new shopCart';
  }

  findAll() {
    return `This action returns all shopCart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shopCart`;
  }

  update(id: number, updateShopCartDto: UpdateShopCartDto) {
    return `This action updates a #${id} shopCart`;
  }

  remove(id: number) {
    return `This action removes a #${id} shopCart`;
  }
}
