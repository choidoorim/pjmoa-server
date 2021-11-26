import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // input 과 dto 클래스를 비교
      forbidNonWhitelisted: true, // dto 에 정의 된 request 자체를 차단
      transform: true, // 자동 형변환
    }),
  );

  await app.listen(process.env.SERVER_PORT);
  console.log(`WebServer Port is ${process.env.SERVER_PORT}`);
}
bootstrap();
