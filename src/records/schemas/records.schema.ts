import * as mongoose from  'mongoose';

export const RecordSchema = new mongoose.Schema({
    name: {type:String,required:true},
    age: {type:Number,required:true},
    fatherName: {type:String,required:true},
    address: {type:String, required:true},
    contactNumber : {type:Number , required:true},
    isDeleted: {type:Boolean,required:false,default:false},
})