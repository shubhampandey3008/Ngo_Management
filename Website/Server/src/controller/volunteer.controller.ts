import { Request , Response } from "express";
import { VolunteerModel } from "../models/volunteer.model";
import { Code } from "../enum/Code";
import { HttpResponse } from "../domain/response";
import { Status } from "../enum/Status";

export async function createVolunteer(req : Request , res : Response)
{
    try {
        const volunteerDetails = await VolunteerModel.create(req.body);
        res.status(Code.OK).json(new HttpResponse(
            Code.OK,
            Status.OK,
            "Request Completed",
            volunteerDetails
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
    } catch (error: string | any) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}

export async function getVolunteersNames(req : Request , res : Response)
{
    try {
        const results = await VolunteerModel.find()
        .select('_id name')
        .sort({name : 1})
        .exec()
    
        res.status(Code.OK).json(results);
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}

export async function filterVolunteer(req : Request , res: Response)
{
    const nameFilter = req.body.nameFilter;
    const emailFilter = req.body.emailFilter;
    const numberFilter = req.body.numberFilter;
    const limit = req.body.limit;
    const page = req.body.page;
    const skip = (page-1) * limit;

    console.log("name" , nameFilter)
    console.log("email" , emailFilter)
    console.log("number" , numberFilter)
    console.log("limit" , limit)
    console.log("page" , skip)
    const query = {
        name: { $regex: nameFilter, $options: 'i' },
        email: { $regex: emailFilter, $options: 'i' }
      }

    try {
        const volunteers = await VolunteerModel.find(query)
        .skip(skip)
        .limit(limit)
    
        const totalVolunteers = await VolunteerModel.countDocuments(query);
        console.log("number of volunteers returned " , totalVolunteers)
    
        res.status(Code.OK).json({
            volunteers : volunteers,
            hasMore: totalVolunteers > skip + volunteers.length
        })
    } catch (error) {
        res.status(Code.INTERNAL_SERVER_ERROR).json(new HttpResponse(
            Code.INTERNAL_SERVER_ERROR,
            Status.INTERNAL_SERVER_ERROR,
            "Request was not completed"
        ));
    }
}