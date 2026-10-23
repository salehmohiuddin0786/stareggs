import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const districts = await prisma.districtCoverage.findMany({
      orderBy: { sortOrder: 'asc' },
    });
    return NextResponse.json({ districts });
  } catch (error) {
    console.error('API /api/districts GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch districts' }, { status: 500 });
  }
}

export async function PATCH(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { districtName, status, coverageHub } = body;

    if (!districtName || !status) {
      return NextResponse.json({ error: 'districtName and status are required' }, { status: 400 });
    }

    const updated = await prisma.districtCoverage.update({
      where: { districtName },
      data: {
        status,
        ...(coverageHub !== undefined && { coverageHub }),
      },
    });

    return NextResponse.json({ success: true, district: updated });
  } catch (error) {
    console.error('API /api/districts PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update district coverage' }, { status: 500 });
  }
}
