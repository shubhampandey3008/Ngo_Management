import VolunteerProfileForm from "./Form/volunteerForm";

export default function addVolunteerPage(){
    return (
        <div className="flex items-center justify-center bg-[url('/IMG_20240428_164207.jpg')] bg-cover bg-center bg-no-repeat">
            <div className="w-1/3 m-10  mt-20">
                <VolunteerProfileForm />
            </div>
        </div>
    )
}