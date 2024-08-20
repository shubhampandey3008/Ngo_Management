import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    img : String,
    name:{type:String , required:true},
    class:Number,
    mName:String,
    dob:Date,
    doj:Date
},
{
    timestamps: true
});

export const StudentModel = mongoose.model("Student" , StudentSchema);
