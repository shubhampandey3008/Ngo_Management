import { Status } from "../enum/Status";
import { Request, Response } from "express";
import { StudentStudyModel } from "../models/studentStudy.model";
import { Code } from "../enum/Code";
import { HttpResponse } from "../domain/response";


export async function setStudentStudy(req : Request , res : Response) : Promise<void>{

    try {
        const student = await StudentStudyModel.create(req.body);
        res.status(Code.OK).json(new HttpResponse(
            Code.OK,
            Status.OK,
            "Request Completed"
        ))
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}

export async function getStudentStudy(req : Request , res : Response) : Promise<void>{
    try {
        
        // get the studentId
        const sId = req.params.id;
        
    } catch (error) {
        
    }
}