import { Router } from "express";

const volunteerRoutes = Router();

volunteerRoutes.get("/:id" , getVolunteer);
volunteerRoutes.post("/create" , createVolunteer);

export default volunteerRoutes;