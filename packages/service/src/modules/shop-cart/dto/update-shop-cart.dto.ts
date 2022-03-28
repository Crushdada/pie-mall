import { PartialType } from '@nestjs/mapped-types';
import { CreateShopCartDto } from './create-shop-cart.dto';

export class UpdateShopCartDto extends PartialType(CreateShopCartDto) {}
