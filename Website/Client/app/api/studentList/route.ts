import { NextResponse } from "next/server"

export async function POST(request: Request){
    const data = await request.json()

    try {
        const response = await fetch(`${process.env.baseURL}/students/filterStudents` , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify(data)
        })
    
        if(!response.ok)
            throw new Error("Server Error")
    
        const studentListResponse = await response.json()
        
    
        return NextResponse.json(studentListResponse)
    } catch (error) {
        console.error('Error fetching student list:', error);
        return NextResponse.json({ error: 'Failed to fetch student list' }, { status: 500 });
    }

}