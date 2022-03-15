import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
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
  public async addGoods(
    @Body() AddGoodsPayload: Array<AddGoodsDto> | AddGoodsDto,
  ) {
    return await this._goodsSrv.create(AddGoodsPayload);
  }

  @Get()
  findAll() {
    return this._goodsSrv.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._goodsSrv.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoodDto: AddGoodsDto) {
    return this._goodsSrv.update(id, updateGoodDto);
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this._goodsSrv.delete(id);
  }

  @Delete()
  deleteByIds(@Body() delIds: Array<string>) {
    return this._goodsSrv.delete(delIds);
  }
}
