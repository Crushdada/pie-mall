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
import { Goods } from '../goods/entities/goods.entity';
@Injectable()
export class ShopCartService {
  constructor(
    @InjectRepository(Goods)
    private readonly _goodsRepo: Repository<Goods>,
    @InjectRepository(ShopCart)
    private readonly _shopCartRepo: Repository<ShopCart>,
    @InjectRepository(CartGoodsMap)
    private readonly _cartGoodsMapRepo: Repository<CartGoodsMap>,
    private readonly _responseSrv: ResponseService,
  ) {}

  findAll() {
    return `This action returns all shopCart`;
  }

  findOne(id) {
    return `This action returns all shopCart`;
  }

  /**
   * 商品加入购物车
   * @param goodsId
   * @param quantity
   */
  create(shopcartId: string, goodsId: string, quantity: number) {
    const tryExecution = async () => {
      const shop_cart = await this._shopCartRepo.findOne(shopcartId);
      const good = await this._goodsRepo.findOne(goodsId);
      const new_map = await this._cartGoodsMapRepo.save({
        good,
        quantity,
      });
      if (!shop_cart.hasOwnProperty('goods_maps')) shop_cart.goods_maps = [];
      shop_cart.goods_maps.push(new_map);
      await this._shopCartRepo.save(shop_cart);
      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 根据商品id检查商品是否已加入购物车
   * @param goodsId
   * @returns Promise<ResponseBody<boolean>>
   */
  async findGoodsMapOrNot(
    shopcartId: string,
    goodsId: string,
  ): Promise<ResponseBody<boolean>> {
    const tryExecution = async () => {
      const shopCart = await this._shopCartRepo.findOne(shopcartId);
      const good = await this._goodsRepo.findOne(goodsId);
      const map = await this._cartGoodsMapRepo.findOne({
        good,
        cart: shopCart,
      });
      // 购物车没有该商品
      if (!map) {
        return this._responseSrv.success(false);
      } else {
        // 已存在
        return this._responseSrv.success(true);
      }
    };
    return this._responseSrv.tryExecute(tryExecution);
  }
  /**
   * 从购物车更新指定商品-数目映射
   * @param id
   * @param newQuantity
   * @returns ResponseBody<any>
   */
  update(
    // shopcartId: string,
    goodsMapId: string,
    newQuantity: number,
  ): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      if (!newQuantity || !goodsMapId) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, null);
      }
      const map = await this._cartGoodsMapRepo.findOne(goodsMapId);
      // 更新对应的数目
      map.quantity = newQuantity;
      this._cartGoodsMapRepo.save(map);
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
