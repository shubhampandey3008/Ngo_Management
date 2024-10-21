import { Router } from "express";
import { createVolunteer, filterVolunteer, getVolunteer, getVolunteersNames } from "../controller/volunteer.controller";

const volunteerRoutes = Router();

volunteerRoutes.get("/getNames" , getVolunteersNames);
volunteerRoutes.get("/:id" , getVolunteer);
volunteerRoutes.post("/filterVolunteers" , filterVolunteer);
volunteerRoutes.post("/create" , createVolunteer);

export default volunteerRoutes;