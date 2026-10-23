import { NextResponse } from 'next/server';
import { getAdminCookieOptions } from '@/lib/auth';

export async function POST() {
  const cookieOpts = getAdminCookieOptions();
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.set(cookieOpts.name, '', {
    ...cookieOpts,
    maxAge: 0,
  });
  return response;
}
