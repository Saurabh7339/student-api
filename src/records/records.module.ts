import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { RecordsController } from './records.controller';
import { RecordsService } from './records.service';
import { RecordSchema } from './schemas/records.schema';

@Module({
  imports: [ MongooseModule.forFeature( [{name:'Record',schema:RecordSchema}])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
