import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmModuleOptions from './config/interfaces/db.interface';
import { LoggerMiddleware } from './middlewares/logger.middleware';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(dbConfig)],
      inject: [ConfigService],
      // 使用工厂模式，该方法return DB相关配置参数
      useFactory: (_cfgSrv: ConfigService) => {
        const cfg: TypeOrmModuleOptions = {
          type: 'mysql',
          host: _cfgSrv.get<string>('db.host'),
          port: _cfgSrv.get<number>('db.port'),
          username: _cfgSrv.get<string>('db.username'),
          password: _cfgSrv.get<string>('db.password'),
          database: _cfgSrv.get<string>('db.db'),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // MiddlewareConsumer: 中间件消费者，指从provider那里接收、处理、应用中间件的对象
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL, // 对所有类型的请求都应用LoggerMiddleware
    });
  }
}
