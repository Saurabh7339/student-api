import { Body, Controller, Get, Post,Param, Delete, Put, Req } from '@nestjs/common';
//import { CreateRecordDto } from './dto/create-record-dto';
import { RecordsService } from './records.service';
import {Record} from './records.interface';
import { query, Request } from 'express';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordsService: RecordsService) {}
    @Get()
    async findAll(): Promise<any> {
        return this.recordsService.findAll();
    }

    // Searching in database with name / father's name 
    // Sorting based on Age 
    @Get('/search') 
    async search(@Req() req:Request) {
        let options ={};
        if(req.query.s){
            options = {
                $or: [
                    {name: new RegExp(req.query.s.toString(), 'i')},
                    {father_name: new RegExp(req.query.s.toString(), 'i')},
                    
                ]
            }

        }
        
        var fetchedData =  await this.recordsService.search(options);
        console.log(fetchedData);
        if(req.query.sort){
            if(req.query.sort=='asc') {
                fetchedData.sort(dynamicSort("age"));
            }
            else {
                fetchedData.sort(dynamicSort("-age"));
            }
        }
        return fetchedData;

        function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
    }

    @Get(':id')
   async  findOne(@Param('id') id) : Promise<any> {
        return this.recordsService.findOne(id);
    }

  

    @Post()
    create(@Body() record: Record):any {
        return this.recordsService.create(record);
    }
    @Post(':id')
    softDelete(@Param('id')id) : any {
        return this.recordsService.softDelete(id);
    }


    @Delete(':id')
    delete(@Param('id')id) : any {
        return this.recordsService.delete(id);
    }

    @Put(':id')
    update(@Body() record: Record, @Param('id') id ): any {
        return `Update ${id} - Name ${record.name}`;
    }
}
