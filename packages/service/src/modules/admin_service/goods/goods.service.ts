import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from './entities/goods.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../../response/response-service';
import { ResponseBody } from '../../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../../types/response/error-type.enum';
import { AddGoodsDto } from './dto/goods.dto';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private readonly _goodsRepo: Repository<Goods>,
    private readonly _responseSrv: ResponseService,
  ) {}

  /**
   * 商品上架/入库
   * @param {Array<AddGoodsDto> | AddGoodsDto} goodsData
   * @returns ResponseBody
   */
  public async addGoods(
    goodsData: Array<AddGoodsDto> & AddGoodsDto,
  ): Promise<ResponseBody<any>> {
    try {
      const rec = await this._goodsRepo.save(goodsData);
      return this._responseSrv.success(rec);
    } catch (err) {
      console.log(err);
      return this._responseSrv.error(ERROR_TYPE.UNKNOW, null, {
        detail: err.toString(),
      });
    }
  }
}
