import { Body, Controller, Get, Post,Param, Delete, Put } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record-dto';
import { RecordsService } from './records.service';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {}
    @Get()
    async findAll(): Promise<any> {
        return this.recordsService.findAll();
    }

    @Get(':id')
   async  findOne(@Param('id') id) : Promise<any> {
        return this.recordsService.findOne(id);
    }


    @Post()
    create(@Body() createRecordDto: CreateRecordDto):any {
        return this.recordsService.create(createRecordDto);
    }

    @Delete(':id')
    delete(@Param('id')id) : any {
        return this.recordsService.delete(id);
    }

    @Put(':id')
    update(@Body() updateRecordDto : CreateRecordDto, @Param('id') id ): any {
        return `Update ${id} - Name ${updateRecordDto.name}`;
    }
}
