import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService } from '../response/response-service';
import { ResponseBody } from '../../../../types/response/response-body.interface';
import { ERROR_TYPE } from '../../../../types/response/error-type.enum';
import { Order } from './entities/order.entity';
import { Guest } from '../user/entities/guest.entity';
import { ReceivingAddress } from '../user/entities/guest-address.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { createClient } from 'redis';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly _orderRepo: Repository<Order>,
    private readonly _responseSrv: ResponseService,
    @InjectRepository(Guest)
    private readonly _guestRepo: Repository<Guest>,
    @InjectRepository(ReceivingAddress)
    private readonly _addressRepo: Repository<ReceivingAddress>,
  ) {}

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
    function SubscribeExpired(err, res) {
      if (err) {
        return;
      }
      const expired_subKey = `__keyevent@${CONF.db}__:expired`; //订阅key过期事件
      client.subscribe(expired_subKey, () => {
        client.on('message', function (event, orderId) {
          // 第二个参数是msg | key
          // 根据orderId，查找order状态，如果未支付，删除order；最后删除redis_key
          console.log('Id:' + orderId);
        });
      });
    }
  }

  /**
   * return ResponseBody<err>
   */
  sessionExpired() {
    return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
      detail: '🙈登录状态失效，请重新登录',
    });
  }

  /**
   * This action adds a new order
   * @param guestId
   * @returns ResponseBody
   */
  public async create(
    guestId: string,
    payload: CreateOrderDto,
  ): Promise<ResponseBody<any>> {
    if (!guestId)
      return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
        detail: `🙈请求失败，找不到Id=${guestId}的用户！`,
      });
    const { address } = payload;
    const tryExecution = async () => {
      const guest = await this._guestRepo.findOne({ id: guestId });
      const goods_maps = await guest?.shop_cart?.goods_maps;
      // 默认初始订单状态为TO_PAY 待支付
      await this._orderRepo.create({ guest, goods_maps });
      // 保存新地址
      await this._addressRepo.insert({
        address: address,
        user: guest,
      });
      // const oldAddress = await this._addressRepo.findOneOrFail({
      //   address: address,
      //   user: guest,
      // });
      // if (!oldAddress) {
      //   this._addressRepo.create({ address: address, user: guest });
      // }

      return this._responseSrv.success(null);
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * This action returns all order
   * @returns ResponseBody<{ allOrders: Array<Order> }>
   */
  findAll(): Promise<ResponseBody<{ allOrders: Array<Order> }>> {
    const tryExecution = async () => {
      const allOrders = await this._orderRepo.find();
      return this._responseSrv.success({ allOrders });
    };
    return this._responseSrv.tryExecute(tryExecution);
  }

  /**
   * This action returns a #${id} order
   * @param id
   * @returns ResponseBody<false | good>
   */
  findOne(id: string): Promise<ResponseBody<any>> {
    const tryExecution = async () => {
      const order = await this._orderRepo.findOne(id);
      if (!order) {
        return this._responseSrv.error(ERROR_TYPE.NOT_FOUND, {
          detail: `所查订单id=${id}不存在`,
        });
      }
      return this._responseSrv.success({ order });
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
