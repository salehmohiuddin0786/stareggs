import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function PUT(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { name, categoryId, description, unitType, minOrderQty, availabilityStatus, imageUrl } = body;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name: name.trim() }),
        ...(categoryId && { categoryId }),
        ...(description && { description: description.trim() }),
        ...(unitType && { unitType }),
        ...(minOrderQty && { minOrderQty }),
        ...(availabilityStatus && { availabilityStatus }),
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error('API /api/products/[id] PUT error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.error('API /api/products/[id] DELETE error:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
