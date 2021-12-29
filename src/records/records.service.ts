import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Record } from './records.interface';

@Injectable()
export class RecordsService {
constructor(@InjectModel('Record') private readonly recordModel : Model<Record>) {}    
 
async findAll():Promise<any>{
    return await this.recordModel.find({});
}

async findOne(id: string): Promise<any> {
    try{
    var storeRecord =  await this.recordModel.findOne({_id:id});
    if(!storeRecord){
        throw new HttpException(`Records Not Found `,HttpStatus.NOT_FOUND);
    }
    else {
        return storeRecord;
    }
    }
    catch(err){
        throw new HttpException(`Error ${err.message}`,HttpStatus.BAD_REQUEST);
    }
}
async create(record: Record): Promise<any> {
    var flagCheck=false;
    var Errors = [];
    // to capitalize the first letter of name 
    if(record.name=="") {
        flagCheck = true;
        Errors.push({msg:"Name cannot be empty"});
    }
    var tempName = record.name;
    var arr = tempName.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    var str2 = arr.join(" ");
    //console.log(str2);
    record.name=str2;
    // to capitalize the first letter of father's name
    if(record.fatherName==""){
        flagCheck=true;
        Errors.push({msg:"Father's Name cannot be empty"});
    }
    tempName = record.fatherName;
    arr = tempName.split(" ");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    str2 = arr.join(" ");
    //console.log(str2);
    record.fatherName=str2;
    // checking age 
    if(record.age.toString()==""){
        flagCheck=true;
        Errors.push({msg:"Please provide your age"});
    }
    if(record.age>60) {
        flagCheck=true;
        Errors.push({msg:"Probably too old to get rolled in "});
    }
    else if(record.age<16) {
        flagCheck=true;
        Errors.push({msg:"Too Young to get rolled in  "});
    }
    // Address
    if(record.address==""){
        flagCheck=true;
        Errors.push({msg:"Address cannot be empty"});
    }
    // Contact Number
    var tempContactNumber  = record.contactNumber;
    if(tempContactNumber.toString().length != 10){
        flagCheck = true;
        Errors.push({msg:"Invalid Contact Number"});
    }
    //checking errors
    if(flagCheck==true){
        return Errors;
    }
    else {
        try {
    const newRecord  = new this.recordModel(record);
    if(!newRecord){
        throw new HttpException(`Could not post request `,HttpStatus.BAD_REQUEST);
    }
    else {
    return await newRecord.save();
    }
        }catch(err){
            throw new HttpException(`Error: ${err.message}`,HttpStatus.NOT_FOUND);
        }
    }
}
async delete(id:string):Promise<any> {
    return await this.recordModel.findByIdAndDelete({_id:id});
}
//search 

 async search(param) :Promise<any> {
    var data  = await this.recordModel.find(param);
    if((await data).length!=0){
        return  data;
    }
    else {
        return "No records Found";
    }
 }

 // Soft Delete from DataBase

 async softDelete(id:string):Promise<any> {
     return this.recordModel.findByIdAndUpdate({_id:id},{"isDeleted":"true"});
     
 }

}
