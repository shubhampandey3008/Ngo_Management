import { Router } from "express";
import { createStudent, getStudent, getStudentNames } from "../controller/student.controller";

const studentRoutes = Router();

studentRoutes.get("/getNames" , getStudentNames);
studentRoutes.get("/:id" , getStudent);
studentRoutes.post("/create" , createStudent);

export default studentRoutes;
