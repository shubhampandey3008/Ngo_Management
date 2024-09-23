import Image from "next/image"
import { Student } from "@/app/students/student_info"
import { Volunteer } from "../volunteer"
import { Volunteer_Details } from "../volunteer_record"
import { VolunteerTable } from "@/app/components/tableTemplate/tableTemplate"

async function getVolunteer(profile: string | string[] | undefined): Promise<Volunteer> {
  const res = await fetch(`${process.env.baseURL}/volunteer/${profile}`)
  const data: Volunteer = await res.json()
  return data
}

async function fetchStudentData(studentId: string) {
  const resp = await fetch(`${process.env.baseURL}${studentId}`)
  const studentProfile: Student = await resp.json()
  return { name: studentProfile.name, url: `${process.env.baseURL}${studentId}` }
}

export default async function VolunteerPage({ params }: { params: { profile: string } }) {
  const volunteerId = params.profile
  const volunteer: Volunteer = await getVolunteer(volunteerId)

  const rows: Volunteer_Details[] = volunteer.weekend_details
  const promises = rows.flatMap((volunteer: Volunteer_Details) =>
    volunteer.students.map((studentId) => fetchStudentData(studentId))
  )

  const studentData = await Promise.all(promises)
  const studentNames = studentData.map(({ name }) => name)
  const studentUrl = studentData.map(({ url }) => url)

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-primary text-primary-foreground p-6">
          <h1 className="text-3xl font-bold text-center">Volunteer Profile</h1>
        </div>
        <div className="md:flex">
          <div className="md:w-1/3 p-6 bg-gray-50">
            <div className="mb-6">
              <Image
                src={volunteer.img}
                width={300}
                height={300}
                alt="Picture of the Volunteer"
                className="rounded-lg shadow-md mx-auto"
              />
            </div>
            <div className="space-y-4">
              <InfoCard>
                <InfoItem label="Name" value={volunteer.name} fullWidth />
              </InfoCard>
              <InfoCard>
                <InfoItem label="Phone No" value={volunteer.phone_no} />
                <InfoItem label="Email" value={volunteer.email} />
              </InfoCard>
              <InfoCard>
                <InfoItem label="Date of Joining" value={volunteer.doj} fullWidth />
              </InfoCard>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Volunteer Activity</h2>
            <VolunteerTable rows={rows} studentNames={studentNames} studentUrl={studentUrl} />
          </div>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return <div className="bg-white rounded-lg shadow p-4 grid grid-cols-2 gap-4">{children}</div>
}

function InfoItem({ label, value, fullWidth = false }: { label: string; value: string; fullWidth?: boolean }) {
  return (
    <div className={fullWidth ? "col-span-2" : ""}>
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900">{value}</dd>
    </div>
  )
}