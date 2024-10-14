import { Router } from "express";
import { addStudentStudy } from "../controller/studentStudy.controller";

const studentStudyRoutes = Router();

studentStudyRoutes.post("/add", addStudentStudy);

export {studentStudyRoutes};