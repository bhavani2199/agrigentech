import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const projectRef = new URL(supabaseUrl).hostname.split('.')[0];

  const cookieName = `sb-${projectRef}-auth-token`;
  const tokenCookie = request.cookies.get(cookieName)?.value;

  if (!tokenCookie) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  let accessToken: string | null = null;
  try {
    const parsed = JSON.parse(tokenCookie);
    accessToken = parsed.access_token ?? parsed[0] ?? null;
  } catch {
    accessToken = tokenCookie;
  }

  if (!accessToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  const res = await fetch(`${supabaseUrl}/auth/v1/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      apikey: supabaseAnonKey,
    },
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
