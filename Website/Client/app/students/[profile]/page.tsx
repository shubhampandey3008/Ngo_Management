import {StudentTable} from "../../components/tableTemplate/tableTemplate";
import Image from "next/image";
import { Student } from "../student_info";

async function getStudent(profile : string | string[] | undefined): Promise<Student> {
  const res = await fetch(`http://192.168.1.9:3000/students/${profile}`);
  const data : Student= await res.json();

  return data;
}

// `app/page.tsx` is the UI for the `/` URL
export default async function StudentPage({params} : {params : {profile : string}}) {
  const studentId = params.profile;
  const student: Student = await getStudent(studentId);

  return (
    <>
      <div className="border-4 border-green-200 flex">
        <div className="border-4 border-yellow-200 m-5 w-1/3">
          <div className="flex items-center justify-center">
          <Image 
          src="/student_school.jpg"
          width={300}
          height={300}
          alt="Picture of the Student"
          />
        </div>
        <div className="grid grid-rows-3">
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              Id : 8823
            </div>
            <div className="text-center">
              Name : {student.name}
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              Class : {student.class}
            </div>
            <div className="text-center">
              Mother Name : {student.mName}
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              DOB : {student.dob}
            </div>
            <div className="text-center">
              DOJ : {student.doj}
            </div>
          </div>
        </div>
        </div>
        <div className="border-4 border-blue-200 m-5 w-2/3">
          <StudentTable student={student}/>
        </div>
      </div>
    </>
  );
}