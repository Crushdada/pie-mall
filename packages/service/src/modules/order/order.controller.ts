import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from '../../../../types/order/order-status.enum';

@Controller('order')
export class OrderController {
  constructor(private readonly _orderSrv: OrderService) {}

  @Get('test')
  test() {
    return this._orderSrv.getConsumptionAnalysisData();
  }

  @Get('sale-volume/analysis')
  getSaleVolumeData() {
    return this._orderSrv.getSaleVolumeData();
  }

  @Get('analysis/:recentDays')
  getOrderAnalysisData(@Param('recentDays') recentDays: number) {
    return this._orderSrv.getOrderAnalysisData(recentDays);
  }

  @Get('consumption/analysis')
  getConsumptionAnalysisData() {
    return this._orderSrv.getConsumptionAnalysisData();
  }

  @Post()
  create(
    @Body() goodsMapIds: Array<string>,
    @Session() session: Record<string, any>,
  ) {
    const { userId } = session.userProfile;
    return this._orderSrv.create(userId, goodsMapIds);
  }
  @Get()
  findAll() {
    return this._orderSrv.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this._orderSrv.findOne(id);
  }

  @Patch(':id/:status')
  payForOrder(
    @Param('id') orderId: string,
    @Param('status') status: OrderStatus,
  ) {
    return this._orderSrv.updateOrderStatus(orderId, status);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this._orderSrv.delete(id);
  }
}
