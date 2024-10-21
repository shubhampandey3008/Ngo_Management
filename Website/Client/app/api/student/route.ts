
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request : NextRequest){
  try {
      const searchParams = request.nextUrl.searchParams
      const profile = searchParams.get('id')

      const response = await fetch(`${process.env.baseURL}/students/${profile}` , {
          method : 'GET',
          headers: {
              'Content-Type': 'application/json',
            }
      })
      
      const volunteerData = await response.json();
  return NextResponse.json(volunteerData);
  } catch (error) {
    console.error('Error processing Volunteer data:', error)
    return NextResponse.json({ error: 'Failed to process Volunteer data' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const response = await fetch(`${process.env.baseURL}/students/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "img": data["profilePicture"],
          "name": data["name"],
          "class":data["class"],
          "mName":data["motherName"],
          "dob":data["dob"],
          "doj":data["doj"],
          "studentStudy":[]
        }),
      });
    
      const studentData = await response.json();
      return NextResponse.redirect(new URL(`/students/${studentData['data']['_id']}` , request.url))
  } catch (error) {
    console.error('Error processing student data:', error)
    return NextResponse.json({ error: 'Failed to process student data' }, { status: 500 })
  }
}