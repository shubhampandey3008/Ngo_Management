import mongoose from "mongoose";

const StudentStudySchema = new mongoose.Schema({
    date : Date,
    attendance:String,
    teacher:String,
    topic:String,
});

const StudentSchema = new mongoose.Schema({
    img : String,
    name:{type:String , required:true},
    class:String,
    mName:String,
    dob:Date,
    doj:Date,
    studentStudy : [StudentStudySchema]
},
{
    timestamps: true
});

export const StudentModel = mongoose.model("Student" , StudentSchema);
