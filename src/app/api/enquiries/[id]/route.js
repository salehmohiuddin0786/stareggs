import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PATCH(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { status, internalNotes, actionNote } = body;

    const existing = await prisma.enquiry.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Enquiry not found' }, { status: 404 });
    }

    const updated = await prisma.enquiry.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(internalNotes !== undefined && { internalNotes }),
      },
    });

    if (actionNote || (status && status !== existing.status)) {
      await prisma.enquiryActivity.create({
        data: {
          enquiryId: id,
          actor: session.name || 'Admin',
          action: status && status !== existing.status ? `STATUS_TO_${status}` : 'NOTE_UPDATED',
          note: actionNote || `Status updated from ${existing.status} to ${status}`,
        },
      });
    }

    return NextResponse.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error('API /api/enquiries/[id] PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await prisma.enquiry.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Enquiry deleted' });
  } catch (error) {
    console.error('API /api/enquiries/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
