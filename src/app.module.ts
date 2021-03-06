import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
//import { RecordsController } from './records/records.controller';
//import { RecordsService } from './records/records.service';
import { RecordsModule } from './records/records.module';
require('dotenv').config();

let mongoconfig = process.env.mongoURI;
@Module({
  imports: [
   RecordsModule,MongooseModule.forRoot(process.env.mongoURI)

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
