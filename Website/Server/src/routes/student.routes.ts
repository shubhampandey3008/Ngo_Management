import { Router } from "express";
import { createStudent, getStudent, getStudentNames } from "../controller/student.controller";

const studentRoutes = Router();

studentRoutes.get("/getNames" , getStudentNames);
studentRoutes.post("/create" , createStudent);
studentRoutes.get("/:id" , getStudent);

export default studentRoutes;
