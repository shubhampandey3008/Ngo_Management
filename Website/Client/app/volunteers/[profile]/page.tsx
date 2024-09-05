import Image from "next/image";
import { Volunteer } from "../volunteer";
import { VolunteerTable } from "@/app/components/tableTemplate/tableTemplate";

async function getStudent(profile : string | string[] | undefined): Promise<Volunteer> {
  const res = await fetch(`http://192.168.1.9:3000/students/${profile}`);
  const data : Volunteer = await res.json();

  return data;
}

// `app/page.tsx` is the UI for the `/` URL
export default async function VolunteerPage({params} : {params : {profile : string}}) {
  const volunteerId = params.profile;
  const volunteer: Volunteer = await getStudent(volunteerId);

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
              Name : {volunteer.name}
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              Class : {volunteer.phone_no}
            </div>
            <div className="text-center">
              Mother Name : {volunteer.email}
            </div>
          </div>
          <div className="border-4 border-purple-300 m-2 grid grid-cols-2">
            <div className="text-center">
              DOJ : {volunteer.doj}
            </div>
            {/* <div className="text-center">
              DOJ : {student.doj}
            </div> */}
          </div>
        </div>
        </div>
        <div className="border-4 border-blue-200 m-5 w-2/3">
          <VolunteerTable volunteer={volunteer}/>
        </div>
      </div>
    </>
  );
}
