import Image from "next/image"
import { Student } from "../student_info"
import { StudentTable } from "@/app/components/tableTemplate/tableTemplate"

async function getStudent(profile: string | string[] | undefined): Promise<Student> {
  const res = await fetch(`http://192.168.61.30:3000/students/${profile}`)
  const data: Student = await res.json()
  return data
}

export default async function StudentPage({ params }: { params: { profile: string } }) {
  const studentId = params.profile
  const student: Student = await getStudent(studentId)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-3xl font-bold text-center">Student Profile</h1>
        </div>
        <div className="md:flex">
          <div className="md:w-1/3 p-6 bg-gray-50">
            <div className="mb-6">
              <Image
                src={student.img}
                width={300}
                height={300}
                alt="Picture of the Student"
                className="rounded-lg shadow-md mx-auto"
              />
            </div>
            <div className="space-y-4">
              <InfoCard>
                <InfoItem label="ID" value="8823" />
                <InfoItem label="Name" value={student.name} />
              </InfoCard>
              <InfoCard>
                <InfoItem label="Class" value={student.class} />
                <InfoItem label="Mother's Name" value={student.mName} />
              </InfoCard>
              <InfoCard>
                <InfoItem label="Date of Birth" value={student.dob} />
                <InfoItem label="Date of Joining" value={student.doj} />
              </InfoCard>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Student Performance</h2>
            <StudentTable student={student} />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-lg shadow p-4 grid grid-cols-2 gap-4">{children}</div>
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  )
}