import { NextResponse } from "next/server"

export async function POST(request: Request){
    const data = await request.json()

    try {
        const response = await fetch(`${process.env.baseURL}/volunteer/filterVolunteers` , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify(data)
        })
    
        if(!response.ok)
            throw new Error("Server Error")
    
        const volunteerListResponse = await response.json()
        
    
        return NextResponse.json(volunteerListResponse)
    } catch (error) {
        console.error('Error fetching volunteer list:', error);
        return NextResponse.json({ error: 'Failed to fetch volunteer list' }, { status: 500 });
    }

}