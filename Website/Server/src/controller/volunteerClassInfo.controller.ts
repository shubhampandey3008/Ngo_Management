import { Request , Response } from "express";
import { VolunteerModel } from "../models/volunteer.model";
import { Code } from "../enum/Code";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/Status";

export async function addVolunteerClassInfo(req : Request , res : Response)
{
    try {
        const volunteerId = req.body.id;
        const volunteerClassInfo = req.body.volunteerClassInfo;

        const newInfo : any = await VolunteerModel.findByIdAndUpdate(
            volunteerId,
            {
                $push : {weekend_details : volunteerClassInfo}
            },
            {
                new: true ,
                runValidators: true
            }
        );
        res.status(Code.OK).json({
            volunteerId : newInfo['_id']
        });
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}