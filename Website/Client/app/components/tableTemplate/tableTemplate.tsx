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
    lable:"DATE"
  },
  {
    key:"attendance",
    lable:"ATTENDANCE"
  },
  {
    key:"students",
    lable:"STUDENTS"
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

export function VolunteerTable(
  {volunteer} : {volunteer : Volunteer}
) {
// Creating row with the Volunteer's Weekend Information
const rows : Volunteer_Details[] = volunteer.weekend_details
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
