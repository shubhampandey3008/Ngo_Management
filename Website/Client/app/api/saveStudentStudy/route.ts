import { NextRequest, NextResponse } from "next/server";

interface sData{
    date : string,
    attendance : string,
    teacher : string,
    topic : string
}
export async function POST(request : Request)
{
    const data = await request.json();
    const studentIds : string[] = data['studentIds']
    const studyData : sData = data['studyData']

    try {
        studentIds.map(async (sId : string)=>{
    
            const studentStudyResponse = await fetch(`${process.env.baseURL}/studentStudy/add` , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    studentId : sId,
                    studyObj : studyData
                })
            })

            if(!studentStudyResponse.ok)
            {
                throw new Error("Server Error");
            }
        })
    } catch (error) {
        console.error("Error saving data",error);
        return NextResponse.json({ message : "Error saving data"} , {status : 500});
    }

    return NextResponse.json({message : "Successfully saved student study info"} , {status : 201});
}