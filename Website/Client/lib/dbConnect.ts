import mongoose from "mongoose";

export default function dbConnect(){
    return mongoose.connect(process.env.MONGO_STRING || "")
    .then((mongoose)=>{
        console.log('Connected to Database');
        return mongoose;
    })
    .catch((error)=>{
        console.log("Error connecting to MongoDB" , error);
    })
}