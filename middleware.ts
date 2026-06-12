import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/admin')) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const projectRef = new URL(supabaseUrl).hostname.split('.')[0];

    const cookieHeader = request.headers.get('cookie') ?? '';
    const hasSession =
      cookieHeader.includes(`sb-${projectRef}-auth-token`) ||
      cookieHeader.includes('sb-access-token') ||
      cookieHeader.includes('supabase-auth-token');

    if (!hasSession) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
