import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddGoodDto } from './dto/add-good.dto';
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
  public addGoods(@Body() AddGoodsPayload: Array<AddGoodsDto> | AddGoodsDto) {
    return this._goodsSrv.create(AddGoodsPayload);
  }

  @Post('atom')
  @ApiOperation({
    summary: '商品数据单个入库，并完成商品图片上传',
  })
  @UseInterceptors(FileInterceptor('G_thumb'))
  public addGood(
    @Body() addGoodPayload: Omit<AddGoodDto, 'G_thumb'>,
    @UploadedFile() G_thumb: Express.Multer.File,
  ) {
    return this._goodsSrv.CreateAtom(addGoodPayload, G_thumb);
  }

  @Get('categories')
  getAllCategories() {
    return this._goodsSrv.findAllCategories();
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
