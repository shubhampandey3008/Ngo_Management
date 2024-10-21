import { Router } from "express";
import { createStudent, filterStudent, getStudent, getStudentNames } from "../controller/student.controller";

const studentRoutes = Router();

studentRoutes.get("/getNames" , getStudentNames);
studentRoutes.post("/create" , createStudent);
studentRoutes.post("/filterStudents" , filterStudent)
studentRoutes.get("/:id" , getStudent);

export default studentRoutes;
