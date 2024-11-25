import { NextResponse, NextRequest } from 'next/server'
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const session = await auth();
  const isAuthorized = session?.user.roleCode === 'ADMIN';

  // If the user is authenticated, continue as normal
  if (!isAuthorized) {
    const loginUrl = new URL('/error', request.url)
    loginUrl.searchParams.set('code', '403')
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
}