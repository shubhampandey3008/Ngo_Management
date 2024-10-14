import {NextResponse} from 'next/server'

export async function POST(request : Request){
    try {
        const data = await request.json();

        const response = await fetch("http://192.168.1.9:3000/volunteer/create" , {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify({
                "img" : data["profilePicture"],
                "name" : data["name"],
                "phone_no" : data["phoneNo"],
                "email" : data["email"],
                "doj" : data["doj"],
                "weekend_details" : []
            })
        })
        
        const volunteerData = await response.json();
        const volunteerId = volunteerData["data"]["_id"];
    return NextResponse.redirect(new URL(`/volunteers/${volunteerId}` , request.url));
    } catch (error) {
      console.error('Error processing Volunteer data:', error)
      return NextResponse.json({ error: 'Failed to process Volunteer data' }, { status: 500 })
    }
}