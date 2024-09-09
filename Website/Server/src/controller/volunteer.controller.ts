import { Request , Response } from "express";
import { VolunteerModel } from "../models/volunteer.model";
import { Code } from "../enum/Code";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/Status";

export async function createVolunteer(req : Request , res : Response)
{
    try {
        await VolunteerModel.create(req.body);
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

export async function getVolunteer(req : Request , res : Response)
{
    try {
        const volunteerId = req.params.id;
        const volunteer = await VolunteerModel.findById(volunteerId);
        res.status(Code.OK).json(volunteer)
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}