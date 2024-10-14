import { Student_Study } from "./student_study";

export type Student = {
  _id: string;
  img: string;
  name: string;
  class: string;
  mName: string;
  dob: string;
  doj: string;
  studentStudy: Student_Study[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};
