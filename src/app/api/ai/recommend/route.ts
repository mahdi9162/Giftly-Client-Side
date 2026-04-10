import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Incoming body:', body);

    const response = await fetch('https://giftly-server-side.vercel.app/api/v1/ai/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    console.log('Backend status:', response.status);

    const text = await response.text();
    console.log('Backend raw response:', text);

    let result;
    try {
      result = JSON.parse(text);
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Backend did not return valid JSON',
          raw: text,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(result, {
      status: response.status,
    });
  } catch (error) {
    console.error('Proxy route error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Failed inside Next proxy route',
      },
      { status: 500 },
    );
  }
}
