import { Injectable } from '@nestjs/common';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { ResponseService } from '../response/response-service';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopCart } from './entities/shop-cart.entity';
import { Repository } from 'typeorm';
import { CartGoodsMap } from './entities/cart-goods-map.entity';
@Injectable()
export class ShopCartService {
  constructor(
    @InjectRepository(ShopCart)
    private readonly _shopCartRepo: Repository<ShopCart>,
    @InjectRepository(CartGoodsMap)
    private readonly _cartGoodsMapRepo: Repository<CartGoodsMap>,
    private readonly _responseSrv: ResponseService,
  ) {}
  create(createShopCartDto: CreateShopCartDto) {
    return 'This action adds a new shopCart';
  }

  findAll() {
    return `This action returns all shopCart`;
  }

  findOne(id: string) {
    return `This action returns a #${id} shopCart`;
  }
  /**
   * 从购物车更新指定商品-数目映射
   * @param id
   * @param newQuantity
   * @returns ResponseBody<any>
   */
  update(
    shopcartId: string,
    goodsId: string,
    newQuantity: number,
  ): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      if (!newQuantity || !goodsId) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, null);
      }
      // const shopCart = await this._shopCartRepo.findOne(shopcartId);
      const map = await this._shopCartRepo
        .createQueryBuilder('shopcart')
        .leftJoinAndSelect('shopcart.goods_maps', 'goodMap')
        .where('shopcart.id = :id', { id: shopcartId })
        .andWhere('goodMap.goodGId = :id', { id: goodsId })
        .getOne();
      // console.log(map);

      // this._shopCartRepo.save(shopCart);
      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 从购物车删除商品
   * @param ids
   * @returns ResponseBody<any>
   */
  delete(
    shopcartId: string,
    delIds: string | Array<string>,
  ): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      if (!shopcartId) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {});
      }
      const shopCart = await this._shopCartRepo.findOne(shopcartId);
      // 删除映射，能否同时删除goods_map实体？
      shopCart.goods_maps = shopCart.goods_maps.filter(goods_map => {
        return !delIds.includes(goods_map.good.G_id);
      });
      this._shopCartRepo.save(shopCart);
      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }
}
