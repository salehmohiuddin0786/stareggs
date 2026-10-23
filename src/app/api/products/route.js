import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { sortOrder: 'asc' },
      include: { category: true },
    });
    return NextResponse.json({ products });
  } catch (error) {
    console.error('API /api/products GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, categoryId, description, unitType, minOrderQty, availabilityStatus, imageUrl } = body;

    if (!name || !categoryId || !description) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const product = await prisma.product.create({
      data: {
        name: name.trim(),
        slug: `${slug}-${Date.now().toString().slice(-4)}`,
        categoryId,
        description: description.trim(),
        unitType: unitType || 'Pulp Tray (30 Eggs)',
        minOrderQty: minOrderQty || '10 Trays',
        availabilityStatus: availabilityStatus || 'IN_STOCK',
        imageUrl: imageUrl || '/images/products/egg-tray.svg',
      },
    });

    return NextResponse.json({ success: true, product });
  } catch (error) {
    console.error('API /api/products POST error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
