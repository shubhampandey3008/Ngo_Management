import { Router } from "express";
import { createVolunteer, getVolunteer } from "../controller/volunteer.controller";

const volunteerRoutes = Router();

volunteerRoutes.get("/:id" , getVolunteer);
volunteerRoutes.post("/create" , createVolunteer);

export default volunteerRoutes;