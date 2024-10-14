import { NextResponse } from "next/server";

interface vData{
    date: Date,
    attendance: String,
    students: [String]
}

export async function POST(request : Request)
{
    const data = await request.json();
    const volunteerId : string = data['volunteerId']
    const weekend_details : vData = data['data']

    try {
    
        const volunteerWeekendResponse = await fetch(`${process.env.baseURL}/volunteerClassInfo/add` , {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify({
                id : volunteerId,
                volunteerClassInfo : weekend_details
            })
        })
        if(!volunteerWeekendResponse.ok)
        {
            throw new Error("Server Error");
        }

        const newVolunteerId = await volunteerWeekendResponse.json()

        return NextResponse.redirect(new URL(`/volunteers/${newVolunteerId['volunteerId']}` , request.url))

    } catch (error) {
        console.error("Error saving data",error);
        return NextResponse.json({ message : "Error saving data"} , {status : 500});
    }

    return NextResponse.json({message : "Successfully saved student study info"} , {status : 201});
}