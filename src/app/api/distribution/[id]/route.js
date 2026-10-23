import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function PATCH(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { status, internalNotes } = body;

    const updated = await prisma.distributionApplication.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(internalNotes !== undefined && { internalNotes }),
      },
    });

    return NextResponse.json({ success: true, application: updated });
  } catch (error) {
    console.error('API /api/distribution/[id] PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await prisma.distributionApplication.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Application deleted' });
  } catch (error) {
    console.error('API /api/distribution/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete application' }, { status: 500 });
  }
}
