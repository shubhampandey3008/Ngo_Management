import StudentTable from "../../components/tableTemplate/tableTemplate";
import { Student_Study } from "./student_study";
import Image from "next/image";

async function getStudentStudy(): Promise<Student_Study[]> {
  const res = await fetch("");
  const data = await res.json();
  return data;
}

// `app/page.tsx` is the UI for the `/` URL
export default async function StudentPage() {
  // const student_study = await getStudentStudy();

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
              Name : Shivam
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              Class : 10
            </div>
            <div className="text-center">
              Mother Name : Reetu
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              DOB : 12/05/10
            </div>
            <div className="text-center">
              DOJ : 20/08/23
            </div>
          </div>
        </div>
        </div>
        <div className="border-4 border-blue-200 m-5 w-2/3">
          {/* <StudentTable student_study={student_study} /> */}
          <StudentTable  />
        </div>
      </div>
    </>
  );
}
