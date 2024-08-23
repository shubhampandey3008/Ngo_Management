import mongoose from "mongoose";

const StudentStudySchema = new mongoose.Schema({
    date : Date,
    attendance:String,
    teacher:String,
    topic:String,
},
{
    timestamps: true
});

export const StudentStudyModel = mongoose.model("StudentStudy" , StudentStudySchema);