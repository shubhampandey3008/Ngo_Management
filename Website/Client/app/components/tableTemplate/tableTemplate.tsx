"use client";

import { Student } from "@/app/students/student_info";
import { Student_Study } from "@/app/students/student_study";
import { Volunteer } from "@/app/volunteers/volunteer";
import { Volunteer_Details } from "@/app/volunteers/volunteer_record";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const studentColumns = [
  {
    key: "date",
    label: "DATE",
  },
  {
    key: "attendance",
    label: "ATTENDANCE",
  },
  {
    key: "topic",
    label: "TOPIC",
  },
  {
    key: "teacher",
    label: "TEACHER",
  },
];

const volunteerColumns = [
  {
    key:"date",
    label:"DATE"
  },
  {
    key:"attendance",
    label:"ATTENDANCE"
  },
  {
    key:"students",
    label:"STUDENTS"
  },
]

export function StudentTable(
  {student} : {student : Student}
) {
// Creating row with the Student Study Information
const rows : Student_Study[] = student.studentStudy
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={studentColumns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

const StudentLinks = ({ studentNames, studentUrl }: { studentNames: string[], studentUrl: string[] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {studentNames.map((name, index) => (
        <a 
          href={studentUrl[index]} 
          key={index} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 font-bold hover:underline"
        >
          {name}
        </a>
      ))}
    </div>
  );
};


export async function VolunteerTable(
  {studentNames , studentUrl , rows} : {studentNames : string[] , studentUrl : string[] , rows: Volunteer_Details[]}
) {

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={volunteerColumns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{(columnKey == 'students')?(
                <StudentLinks studentNames={studentNames}  studentUrl = {studentUrl} />
              ): getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
