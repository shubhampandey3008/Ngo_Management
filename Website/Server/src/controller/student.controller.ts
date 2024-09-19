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