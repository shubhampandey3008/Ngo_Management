import { Router } from "express";
import { createStudent, getStudent } from "../controller/student.controller";

const studentRoutes = Router();

studentRoutes.get("/:id" , getStudent);
studentRoutes.post("/create" , createStudent);

export default studentRoutes;
