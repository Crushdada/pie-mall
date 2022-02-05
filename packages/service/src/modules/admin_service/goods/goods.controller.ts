import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddGoodsDto } from './dto/goods.dto';
import { GoodsService } from './goods.service';

@Controller('goods')
@ApiTags('goods')
export class GoodsController {
  constructor(private readonly _goodsSrv: GoodsService) {}
  @Post()
  @ApiOperation({
    summary: '商品数据批量入库',
  })
  public async addGoods(@Body() AddGoodsPayload: AddGoodsDto) {
    console.log('访问了goods接口');
    return await this._goodsSrv.addGoods(AddGoodsPayload);
  }
}
