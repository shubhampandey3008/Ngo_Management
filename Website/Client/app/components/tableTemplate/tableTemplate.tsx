"use client";

import { Student_Study } from "@/app/students/[profile]/student_study";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

const rows = [
  {
    key: "1",
    sno: "Tony Reichert",
    date: "CEO",
    attendance: "Active",
    teacher: "asdf",
  },
  {
    key: "1",
    sno: "Tony Reichert",
    date: "CEO",
    attendance: "Active",
    teacher: "asdf",
  },
  {
    key: "1",
    sno: "Tony Reichert",
    date: "CEO",
    attendance: "Active",

    teacher: "asdf",
  },
  {
    key: "1",
    sno: "Tony Reichert",
    date: "CEO",
    attendance: "Active",
    teacher: "asdf",
  },
];

const columns = [
  {
    key: "sno",
    label: "SNo",
  },
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

// export default function StudentTable({
//   student_study,
// }: {
//   student_study: Student_Study[];
// }) {
  export default function StudentTable() {
  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
