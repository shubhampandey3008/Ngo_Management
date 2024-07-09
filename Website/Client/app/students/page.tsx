import StudentTable from "../components/tableTemplate/tableTemplate";
import { Student_Study } from "./student_study";

async function getStudentStudy(): Promise<Student_Study[]> {
  const res = await fetch("");
  const data = await res.json();
  return data;
}

// `app/page.tsx` is the UI for the `/` URL
export default async function StudentPage() {
  const student_study = await getStudentStudy();

  return (
    <>
      <div className="border-4 border-green-200 flex">
        <div className="border-4 border-yellow-200 m-5 w-1/3">
          <div className="border-4 border-red-200 m-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque
            similique odio deleniti eligendi beatae nam at repellendus commodi
            eveniet. Aperiam pariatur repellat ea impedit, ipsa quos rerum?
            Illo, impedit inventore.
          </div>
          <div className="border-4 border-purple-300 m-2">
            Lorem ipsum dolor sit amet consectetur adipisicing{" "}
          </div>
        </div>
        <div className="border-4 border-blue-200 m-5 w-2/3">
          <StudentTable student_study={student_study} />
        </div>
      </div>
    </>
  );
}
