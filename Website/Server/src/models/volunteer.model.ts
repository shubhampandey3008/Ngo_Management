import mongoose from "mongoose";

const Volunteer_Details = new mongoose.Schema({
    date: Date,
    attendance: String,
    students: [String]
});

const VolunteerSchema = new mongoose.Schema({
    img: String,
    name: String,
    phone_no: Number,
    email: String,
    doj: Date,
    weekend_details : [Volunteer_Details]
},
{
    timestamps : true
});

export const VolunteerModel = mongoose.model("Volunteer" , VolunteerSchema);