import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from './records.interface';

@Injectable()
export class RecordsService {
constructor(@InjectModel('Record') private readonly recordModel : Model<Record>) {}    
 
async findAll():Promise<any>{
    return await this.recordModel.find();
}

async findOne(id: string): Promise<any> {
    return await this.recordModel.findOne({_id:id});
}
async create(record: Record): Promise<any> {
    const newRecord  = new this.recordModel(record);
    return await newRecord.save();
}
async delete(id:string):Promise<any> {
    return await this.recordModel.findByIdAndDelete({_id:id});
}

}
