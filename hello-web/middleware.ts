import { NextResponse, NextRequest } from 'next/server'
import { auth } from './auth';
 
export async function middleware(request: NextRequest) {
  // const session = await auth();
  const isAuthenticated = true;
 
  // If the user is authenticated, continue as normal
  if (isAuthenticated) {
    return NextResponse.next()
  }
 
  return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/admin/:path*',
}