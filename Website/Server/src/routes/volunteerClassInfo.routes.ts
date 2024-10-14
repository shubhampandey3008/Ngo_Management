import { Router } from "express";
import { addVolunteerClassInfo } from "../controller/volunteerClassInfo.controller";

const volunteerClassRoutes = Router();

volunteerClassRoutes.post("/add" , addVolunteerClassInfo);

export default volunteerClassRoutes;