import StudentProfileForm from './Form/studentForm';

export default async function addStudentPage()
{
    return(
        <div className="flex items-center justify-center bg-[url('/IMG-20240610-WA0039.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="w-1/3 m-10  mt-20">
            <StudentProfileForm />
            </div>
        </div>
    )
}