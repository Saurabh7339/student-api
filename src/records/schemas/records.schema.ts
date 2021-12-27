import * as mongoose from  'mongoose';

export const RecordSchema = new mongoose.Schema({
    name:String,
    age:Number,
    father_name: String,
    address: String,
    contact_no : Number
})