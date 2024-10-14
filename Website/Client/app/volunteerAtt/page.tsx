import VolunteerAttendanceForm from "./Form/volunteerAttForm";

interface NameData {
    _id: string;
    name: string;
  }
  
interface FetchDataResult {
    studentNames: NameData[];
    volunteerNames: NameData[];
  }

async function fetchData() : Promise<FetchDataResult>
{
    try {
        const baseURL = process.env.baseURL;

        // Getting student and teacher details
        const studentResponse = await fetch(`${baseURL}/students/getNames` , {
            cache: 'no-cache',
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        });

        if (!studentResponse.ok) {
            throw new Error('Failed to fetch student names');
        }
    
        const studentNames = await studentResponse.json();
    
        const volunteerResponse = await fetch(`${baseURL}/volunteer/getNames` , {
            cache: 'no-cache',
            method: 'GET',
            headers : {
                'Content-Type': 'application/json',
            }
        });

        if (!volunteerResponse.ok) {
            throw new Error('Failed to fetch teacher names');
        }
    
        const volunteerNames = await volunteerResponse.json();
    
        return {studentNames , volunteerNames};
    } catch (error) {
        console.error("Following error occured : " , {error})
        return {studentNames:[] , volunteerNames:[]}
    }
}

export default async function volunteerAttPage(){

   const {studentNames , volunteerNames} = await fetchData()
    
    return (
        <div className="flex items-center justify-center bg-[url('/IMG-20240311-WA0008.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="w-1/3 m-20  mt-20">
            <VolunteerAttendanceForm studentNames={studentNames} volunteerNames={volunteerNames} />
            </div>
        </div>
        
    )
}