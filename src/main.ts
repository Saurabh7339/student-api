import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const express  = require('express');

const app = express();
app.use('/',express.static(__dirname+'/staticfiles'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
