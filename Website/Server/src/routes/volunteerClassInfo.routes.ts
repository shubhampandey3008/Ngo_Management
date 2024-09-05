import { Router } from "express";

const volunteerClassRoutes = Router();

volunteerClassRoutes.post("/add" , addVolunteerClassInfo);

export default volunteerClassRoutes;