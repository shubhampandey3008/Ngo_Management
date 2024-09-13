
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    const response = await fetch('http://192.168.22.180:3000/students/create', {
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

    console.log('Received student data:', data)

    return NextResponse.json({ message: 'Student profile created successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error processing student data:', error)
    return NextResponse.json({ error: 'Failed to process student data' }, { status: 500 })
  }
}