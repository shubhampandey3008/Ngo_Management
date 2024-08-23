import { Router } from "express";
import { setStudentStudy } from "../controller/studentStudy.controller";

const studentStudyRoutes = Router();

studentStudyRoutes.post("/set", setStudentStudy);

export {studentStudyRoutes};