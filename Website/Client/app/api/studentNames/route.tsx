import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const baseURL = process.env.baseURL;
        const response = await fetch(`${baseURL}/students/getNames`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch student names');
        }

        const studentNames = await response.json();

        return NextResponse.json(studentNames);
    } catch (error) {
        console.error('Error fetching student names:', error);
        return NextResponse.json({ error: 'Failed to fetch student names' }, { status: 500 });
    }
}