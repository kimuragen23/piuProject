import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as hbs from 'hbs';
import * as fs from 'fs';

async function bootstrap() {


  const app = await NestFactory.create<NestExpressApplication>(AppModule);


  app.useGlobalPipes(
    //https://docs.nestjs.com/techniques/validation
    new ValidationPipe({
      //whitelist: true는 들어오는 데이터에서 유효하지 않은 속성을 자동으로 제거하도록 하는 옵션.
      whitelist: true,
      //dto에 정의되지 않은 프로퍼티를 차단하기 위한 용도로 사용
      forbidNonWhitelisted: true,
      //transform: true는 들어오는 데이터를 자동으로 변환하도록 하는 옵션이다.
      transform: true,
    }),
  );
  app.enableCors({
    origin: true,
    credentials: true
  })
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));
  await app.listen(80);
  //http://118.67.128.6
}
bootstrap();
