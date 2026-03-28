import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/dashboard', '/cart'];
const authRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  //  private route block if users not loggin
  if (isPrivateRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // if user logged in - cant go to login and register page
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/cart', '/login', '/register'],
};
