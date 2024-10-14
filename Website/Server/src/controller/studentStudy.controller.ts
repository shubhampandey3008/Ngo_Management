import { Status } from "../enum/Status";
import { Request, Response } from "express";
import { Code } from "../enum/Code";
import { HttpResponse } from "../domain/response";
import { StudentModel } from "../models/student.model";


export async function addStudentStudy(req : Request , res : Response) : Promise<void>{

    try {
        const studentId = req.body.studentId;
        console.log(studentId)
        const newStudyObject = req.body.studyObj;
        console.log(newStudyObject)
        const newStudy = await StudentModel.findByIdAndUpdate(
            studentId,
            {
                $push : {studentStudy : newStudyObject}
            },
            {
                new: true ,
                runValidators: true
            }
        )
        res.status(Code.OK).json(newStudy);
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}

// Getting the top 5 details from the getStudentStudy
export async function getStudentStudy(req : Request , res : Response) : Promise<void>{
    try {
        
        // get the studentId
        const sId = req.params.id;

    } catch (error) {
        
    }
}