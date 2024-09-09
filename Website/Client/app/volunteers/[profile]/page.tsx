import Image from "next/image";
import { Volunteer } from "../volunteer";
import { VolunteerTable } from "@/app/components/tableTemplate/tableTemplate";
import { Volunteer_Details } from "../volunteer_record";
import { Student } from "@/app/students/student_info";

async function getVolunteer(profile : string | string[] | undefined): Promise<Volunteer> {
  const res = await fetch(`http://192.168.1.9:3000/volunteer/${profile}`);
  const data : Volunteer = await res.json();

  return data;
}

// `app/page.tsx` is the UI for the `/` URL
export default async function VolunteerPage({params} : {params : {profile : string}}) {
  const volunteerId = params.profile;
  console.log(`The profile id is : ${volunteerId}`)
  const volunteer: Volunteer = await getVolunteer(volunteerId);

const rows: Volunteer_Details[] = volunteer.weekend_details;
const studentNames: string[] = [];
const studentUrl: string[] = [];

const fetchStudentData = async (studentId: string) => {
  const resp = await fetch(`http://192.168.1.9:3000/student/${studentId}`);
  const studentProfile: Student = await resp.json();
  return { name: studentProfile.name, url: `http://192.168.1.9:3000/student/${studentId}` };
};

const promises = rows.flatMap((volunteer: Volunteer_Details) =>
  volunteer.students.map((studentId) => fetchStudentData(studentId))
);

const studentData = await Promise.all(promises);
studentData.forEach(({ name, url }) => {
  studentNames.push(name);
  studentUrl.push(url);
});
// studentNames.push("Ramu");
// studentNames.push("Shaamu");
console.log(studentNames , studentUrl)

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
            {/* <div className="text-center">
              Id : 8823
            </div> */}
            <div className="col-span-2 text-center">
              Name : {volunteer.name}
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              Phone No : {volunteer.phone_no}
            </div>
            <div className="text-center">
              Email : {volunteer.email}
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="col-span-2 text-center">
              DOJ : {volunteer.doj}
            </div>
            {/* <div className="text-center">
              DOJ : {student.doj}
            </div> */}
          </div>
        </div>
        </div>
        <div className="border-4 border-blue-200 m-5 w-2/3">
          <VolunteerTable rows={rows} studentNames={studentNames} studentUrl={studentUrl}/>
        </div>
      </div>
    </>
  );
}
