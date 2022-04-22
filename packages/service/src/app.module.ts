import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmModuleOptions from './config/interfaces/db.interface';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { checkClientMiddleware } from './middlewares/check-client.middleware';
import { GoodsModule } from './modules/goods/goods.module';
import { OrderModule } from './modules/order/order.module';
import { ResponseModule } from './modules/response/response-module';
import { UserModule } from './modules/user/user.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ShopCartModule } from './modules/shop-cart/shop-cart.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      //配置文件路径，也可以配置为数组如['/config/.env1','.env']。
      envFilePath: '.env',
      //忽略配置文件，为true则仅读取操作系统环境变量，常用于生产环境
      ignoreEnvFile: false,
      ignoreEnvVars: false,
      //配置为全局可见，否则需要在每个模块中单独导入ConfigModule
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [ConfigService],
      // 使用工厂模式，该方法return DB相关配置参数
      useFactory: (_cfgSrv: ConfigService) => {
        const cfg: TypeOrmModuleOptions = {
          type: 'mysql',
          host: _cfgSrv.get<string>('db.host') || 'localhost',
          port: _cfgSrv.get<number>('db.port') || 3306,
          username: 'root',
          password: _cfgSrv.get<string>('db.password') || 'root',
          database: _cfgSrv.get<string>('db.db') || 'piemall',
          pool: {
            max: 20,
          },
          extra: {
            connectionLimit: 100,
          },
          logging: true,
          logger: 'file',
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV !== 'production',
        };

        return cfg;
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.SSD),
    }),
    ShopCartModule,
    GoodsModule,
    UserModule,
    OrderModule,
    ResponseModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule implements NestModule {
  // MiddlewareConsumer: 中间件消费者，指从provider那里接收、处理、应用中间件的对象
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, checkClientMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL, // 对所有类型的请求都应用LoggerMiddleware
    });
  }
}
