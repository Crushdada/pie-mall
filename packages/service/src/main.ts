import * as session from 'express-session';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // API 文档插件
import { ValidationPipe } from '@nestjs/common';
import { createClient } from 'redis';
import * as ConnectRedis from 'connect-redis';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost:8081', 'http://localhost:8080'],
      credentials: true,
    },
  });
  const redisClient = createClient('6379', '127.0.0.1');
  const RedisStore = ConnectRedis(session);

  // 全局参数验证
  app.useGlobalPipes(new ValidationPipe());

  // express-session
  const ExpirationTime = 3600000 * 8; // 8h
  app.use(
    session({
      secret: 'crushdada',
      store: new RedisStore({ client: redisClient }),
      cookie: {
        expires: new Date(Date.now() + ExpirationTime),
        maxAge: ExpirationTime,
      },
      resave: false,
      saveUninitialized: false,
    }),
  );

  // DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule
  // 它包含几种方法，可用于设置诸如标题、描述、版本等属性
  const options = new DocumentBuilder()
    .setTitle('Pie-Mall API Interface') // 标题
    .setDescription('测试接口') // 描述
    .setVersion('1.00') //版本
    .addTag('pie-mall-service') // 每个tag标签都可以对应几个@ApiUseTags('用户,安全')，
    // 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
    // .setBasePath('http://localhost:5000')
    .build();

  // 为了创建完整的文档(具有定义的HTTP路由)
  // 我们使用类的SwaggerModule.createDocument()方法
  // 此方法有两个参数，分别是应用程序实例和基本Swagger options
  const document = SwaggerModule.createDocument(app, options);
  // 最后一步是setup()，参数：装入swagger的路径、应用程序实例、 描述Nest应用程序的文档
  SwaggerModule.setup('/docs', app, document);
  const _srvPort = process.env.PIEMALL_SERVICE_PORT;
  // 当前加的path是/docs，则SwaggerGui部署在http://localhost:_srvPort/docs
  await app.listen(_srvPort);
}
bootstrap();
