// app/api/dashboard/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request) {
    try {

    const userData = cookies().get('cargorun_userToken');
      
    const response = await fetch('https://cargo-run-backend.onrender.com/api/v1/rider', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.value}`
      },
    });
 
    if (!response.ok) {
      const errorResult = await response.json();
      return NextResponse.json({ error: errorResult.message || 'Failed to fetch data' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
