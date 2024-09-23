import StudentAttendanceForm from "./Form/studentAttForm";

interface NameData {
    _id: string;
    name: string;
  }
  
  interface FetchDataResult {
    studentNames: NameData[];
    teacherNames: NameData[];
  }

async function fetchData() : Promise<FetchDataResult>
{
    try {
        const baseURL = process.env.baseURL;

        // Getting student and teacher details
        const studentResponse = await fetch(`${baseURL}/students/getNames` , {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        });

        if (!studentResponse.ok) {
            throw new Error('Failed to fetch student names');
        }
    
        const studentNames = await studentResponse.json();
    
        const teacherResponse = await fetch(`${baseURL}/volunteer/getNames` , {
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        });

        if (!teacherResponse.ok) {
            throw new Error('Failed to fetch teacher names');
        }
    
        const teacherNames = await teacherResponse.json();
    
        return {studentNames , teacherNames};
    } catch (error) {
        console.error("Following error occured : " , {error})
        return {studentNames:[] , teacherNames:[]}
    }
}

export default async function addStudentAttendancePage()
{
    const {studentNames , teacherNames} = await fetchData()

    return (
        <StudentAttendanceForm studentNames={studentNames} teacherNames={teacherNames}/>
    )
}