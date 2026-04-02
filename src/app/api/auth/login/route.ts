import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const backendResponse = await fetch('https://giftly-server-side.vercel.app/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const result = await backendResponse.json();

    if (!backendResponse.ok || !result.success) {
      return NextResponse.json(
        {
          success: false,
          message: result.message || 'Login failed',
        },
        { status: backendResponse.status },
      );
    }

    const cookieStore = await cookies();

    const isProduction = process.env.NODE_ENV === 'production';

    cookieStore.set('token', result.token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'lax' : 'lax',
      path: '/',
    });

    return NextResponse.json({
      success: true,
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while logging in',
        error,
      },
      { status: 500 },
    );
  }
}
