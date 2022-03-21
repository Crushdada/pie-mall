import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Goods } from './entities/goods.entity';
import { Repository } from 'typeorm';
import { ResponseService } from '../response/response-service';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { AddGoodsDto } from './dto/goods.dto';
import { AddGoodDto } from './dto/add-good.dto';
import { StaticResourceService } from '../static-resource/static-resource.service';
@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(Goods)
    private readonly _goodsRepo: Repository<Goods>,
    private readonly _responseSrv: ResponseService,
    private readonly _staticResourceSrv: StaticResourceService,
  ) {}

  /**
   * 查询全部商品类别
   * @returns ResponseBody<false | allGoodsCategories>
   */
  findAllCategories(): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      const rawGoodsCategories = await this._goodsRepo.query(
        'SELECT DISTINCT goods.G_category FROM goods;',
      );
      const goodsCategories = rawGoodsCategories.map(good => good.G_category);
      return this._responseSrv.success({
        goodsCategories: goodsCategories,
      });
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 查询全部商品
   * @returns ResponseBody<false | allGoods>
   */
  findAll(): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      const allGoods = await this._goodsRepo.find();
      return this._responseSrv.success({ allGoods });
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 查询单个商品
   * @param id
   * @returns ResponseBody<false | good>
   */
  findOne(id: string): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      const good = await this._goodsRepo.findOne(id);
      if (!good) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: `所查商品id=${id}不存在`,
        });
      }
      return this._responseSrv.success({ good });
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 更新商品
   * @param id
   * @param goodsData
   * @returns ResponseBody<any>
   */
  update(id: string, updateGoodDto: AddGoodsDto): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      const exeResult = await this._goodsRepo.update(id, updateGoodDto);
      if (!exeResult) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: `所更新商品id=${id}不存在`,
        });
      }
      return this._responseSrv.success({});
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 删除商品
   * @param ids
   * @returns ResponseBody<any>
   */
  delete(ids: string | Array<string>): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      if (!ids) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: `所删除商品id=${ids}不存在`,
        });
      }
      await this._goodsRepo.delete(ids);
      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 商品上架/入库
   * @param {Array<AddGoodsDto> | AddGoodsDto} goodsData
   * @returns ResponseBody
   */
  public async create(
    goodsEntities: Array<AddGoodsDto> | AddGoodsDto,
  ): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      await this._goodsRepo.insert(goodsEntities);
      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }
  /**
   * 商品上架/入库
   * @param { AddGoodDto } goodsData
   * @returns ResponseBody
   */
  public async CreateAtom(
    goodsEntity: Omit<AddGoodDto, 'G_thumb'>,
    file: Express.Multer.File,
  ): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      const goodEntity = await this._goodsRepo.save({
        ...goodsEntity,
        G_thumb: '',
      });
      const { G_id } = goodEntity;
      const path = '/goods-thumb';
      const fileName = `${G_id}.jpg`;
      const fileAccessUrl = this._staticResourceSrv.storageService(
        file,
        path,
        fileName,
      );
      await this._goodsRepo.update(G_id, { G_thumb: fileAccessUrl });
      return this._responseSrv.success(fileAccessUrl);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }
}
