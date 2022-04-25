import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { ResponseService } from '../response/response-service';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { Order } from './entities/order.entity';
import { Guest } from '../user/entities/guest.entity';
import { createClient } from 'redis';
import { OrderStatus } from '../../../../types/order/order-status.enum';
import { ShopCartService } from '../shop-cart/shop-cart.service';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly _orderRepo: Repository<Order>,
    private readonly _responseSrv: ResponseService,
    private readonly _shopCartSrv: ShopCartService,
    @InjectRepository(Guest)
    private readonly _guestRepo: Repository<Guest>,
  ) {}

  /**
   * admin端消费水平数据分析
   */
  getConsumptionAnalysisData() {
    const tryExecution = async () => {
      const exeResult = await this._orderRepo.query(
        `SELECT piemall.guest.name as userName,SUM(quantity * G_price) as consumption FROM piemall.order LEFT JOIN piemall.cart_goods_map ON piemall.order.id = piemall.cart_goods_map.orderId LEFT JOIN piemall.goods ON goods.G_id = piemall.cart_goods_map.goodGId LEFT JOIN piemall.guest ON guest.id = piemall.order.guestId WHERE status != 'to_pay' GROUP BY guestId ORDER BY SUM(quantity * G_price);`,
      );
      return this._responseSrv.success(exeResult);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * admin端订单数据分析
   * @param recentDays
   */
  getOrderAnalysisData(recentDays: number) {
    const tryExecution = async () => {
      const recentOrders = await this._orderRepo.query(
        `select DATE_FORMAT(timeStamp, '%Y.%m.%d') as create_at,COUNT(DATE_FORMAT(timeStamp, '%Y-%m-%d')) as orderCounts from piemall.order where TO_DAYS(NOW()) - TO_DAYS(timeStamp) <= ${recentDays} group by create_at ORDER BY create_at;`,
      );
      const exeResult = await this._orderRepo.query(
        'SELECT COUNT(*) as totalOrderCounts FROM piemall.order;',
      );
      const totalOrderCounts = exeResult[0].totalOrderCounts;
      return this._responseSrv.success({ recentOrders, totalOrderCounts });
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 更新order状态
   * @param orderId
   * @param status
   */
  updateOrderStatus(orderId: string, status: OrderStatus) {
    const tryExecution = async () => {
      const exeResult = await this._orderRepo.update(orderId, { status });
      if (!exeResult) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: `所更新订单id=${orderId}不存在`,
        });
      }
      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * 执行订单过期处理
   * @param orderId
   */
  orderExpirationProcessing(orderId: string) {
    if (!orderId) {
      return;
    }
    const CONF = {
      port: 6379,
      host: 'localhost',
      db: 0, // 要与redis服务器的redis.windows-service.conf 配置的db一致
      orderExpired: 15 * 60, // 15分钟
    };
    const client = createClient(CONF.port, CONF.host);
    client.set(orderId, '');
    client.expire(orderId, CONF.orderExpired);
    client.send_command(
      'config',
      ['set', 'notify-keyspace-events', 'Ex'],
      SubscribeExpired,
    );
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const _orderRepo = this._orderRepo;
    function SubscribeExpired(err, res) {
      if (err) {
        return;
      }
      const expired_subKey = `__keyevent@${CONF.db}__:expired`; //订阅key过期事件
      client.subscribe(expired_subKey, () => {
        client.on('message', async function (event, orderId) {
          // 第二个参数是msg | key
          // 根据orderId，查找order状态
          const order = await _orderRepo.findOne(orderId);
          // 如果仍未支付，删除order
          if (orderId && order.status === OrderStatus.TO_PAY) {
            _orderRepo.delete(orderId);
          }
        });
      });
    }
  }

  /**
   * This action adds a new order
   * @param guestId
   * @returns ResponseBody
   */
  public async create(
    guestId: string,
    orderGoodsMapIds: Array<string>,
  ): Promise<ResponseBody<any>> {
    if (!guestId)
      return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
        detail: `🙈请求失败，找不到Id=${guestId}的用户！`,
      });
    const tryExecution = async () => {
      const guest = await this._guestRepo.findOne(guestId);
      const address = guest.default_address;
      const shopCartId = guest?.shop_cart?.id;
      // 只保留勾选的，即要购买的商品映射
      const order_goods_maps = guest?.shop_cart?.goods_maps.filter(map =>
        orderGoodsMapIds.includes(map.id),
      );
      // 默认初始订单状态为TO_PAY 待支付
      const order = await this._orderRepo.save({
        guest,
        address,
        goods_maps: order_goods_maps,
        status: OrderStatus.TO_PAY,
      });
      const orderId = order.id;
      // 执行订单超时
      this.orderExpirationProcessing(orderId);
      // 删除购物车与已下单的商品的映射逻辑
      this._shopCartSrv.delete(shopCartId, orderGoodsMapIds);
      return this._responseSrv.success({
        orderId,
        expiredTime: 15 * 60,
      });
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * This action returns a #${id} order
   * @param id
   * @returns ResponseBody<order>
   */
  findOne(id: string): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      const order = await this._orderRepo.findOne(id);
      if (!order) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: `所查订单id=${id}不存在`,
        });
      }
      return this._responseSrv.success(order);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * This action returns all order
   * @returns ResponseBody<{ allOrders: Array<Order> }>
   */
  findAll(): Promise<ResponseBody<{ allOrders: Array<Order> }>> {
    const tryExecution = async () => {
      const allOrders = await this._orderRepo.find({
        relations: ['goods_maps', 'guest'],
      });
      return this._responseSrv.success({ allOrders });
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  // update(id: string, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  /**
   * This action deletes orders
   * @param ids
   * @returns ResponseBody<any>
   */
  delete(ids: string | Array<string>): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      if (!ids) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: `所删除订单id=${ids}不存在`,
        });
      }
      await this._orderRepo.delete(ids);
      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }
}
