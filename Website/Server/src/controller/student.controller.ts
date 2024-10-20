import { Request , Response } from "express";
import { StudentModel } from "../models/student.model";
import { HttpResponse } from "../domain/response";
import { Code } from "../enum/Code";
import { Status } from "../enum/Status";

export async function getStudent(req : Request , res : Response) : Promise<any>{
    const studentID = req.params.id;

    try {
        const student = await StudentModel.findById(studentID);
        res.status(Code.OK).json(student)
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}

export async function createStudent(req : Request , res : Response) : Promise<void>{

    try {
        const student = await StudentModel.create(req.body);
        res.status(Code.OK).json(new HttpResponse(
            Code.OK,
            Status.OK,
            "Request Completed",
            student
        ))
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}

export async function getStudentNames(req : Request , res : Response)
{
    try {
        const results = await StudentModel.find()
        .select('_id name')
        .sort({name : 1})
        .exec();
    
        res.status(Code.OK).json(results);
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}

export async function filterStudent(req : Request , res: Response)
{
    const nameFilter = req.body.nameFilter;
    const limit = req.body.limit;
    const page = req.body.page;
    const skip = (page-1) * limit;

    console.log("name" , nameFilter)
    console.log("limit" , limit)
    console.log("page" , skip)
    const query = {
        name: { $regex: nameFilter, $options: 'i' }
      }

    try {
        const students = await StudentModel.find(query)
        .skip(skip)
        .limit(limit)
    
        const totalVolunteers = await StudentModel.countDocuments(query);
        console.log("number of volunteers returned " , totalVolunteers)
    
        res.status(Code.OK).json({
            students : students,
            hasMore: totalVolunteers > skip + students.length
        })
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}