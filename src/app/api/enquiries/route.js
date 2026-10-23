import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Helper for CSV output
function convertToCSV(data) {
  if (!data || data.length === 0) return '';
  const headers = [
    'Reference ID',
    'Date',
    'Type',
    'Business Name',
    'Contact Person',
    'Phone',
    'WhatsApp',
    'Email',
    'Business Type',
    'District',
    'Locality',
    'Product',
    'Estimated Volume',
    'Packaging Preference',
    'Delivery Frequency',
    'Status',
  ];

  const rows = data.map((item) => [
    `"${item.id}"`,
    `"${new Date(item.createdAt).toISOString()}"`,
    `"${item.type || ''}"`,
    `"${(item.businessName || '').replace(/"/g, '""')}"`,
    `"${(item.contactPerson || '').replace(/"/g, '""')}"`,
    `"${item.phone || ''}"`,
    `"${item.whatsapp || ''}"`,
    `"${item.email || ''}"`,
    `"${item.businessType || ''}"`,
    `"${item.district || ''}"`,
    `"${(item.locality || '').replace(/"/g, '""')}"`,
    `"${(item.productName || '').replace(/"/g, '""')}"`,
    `"${item.estimatedVolume || ''}"`,
    `"${item.packagingPreference || ''}"`,
    `"${item.deliveryFrequency || ''}"`,
    `"${item.status || ''}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export async function GET(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized. Admin authentication required.' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const type = searchParams.get('type') || '';
    const isExport = searchParams.get('export') === 'csv';

    const where = {};
    if (status && status !== 'ALL') where.status = status;
    if (type && type !== 'ALL') where.type = type;

    if (search) {
      where.OR = [
        { businessName: { contains: search } },
        { contactPerson: { contains: search } },
        { phone: { contains: search } },
        { district: { contains: search } },
        { locality: { contains: search } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { activities: { orderBy: { createdAt: 'desc' } } },
    });

    if (isExport) {
      const csv = convertToCSV(enquiries);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="stareggs-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({ enquiries });
  } catch (error) {
    console.error('API /api/enquiries GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Anti-spam honeypot check
    if (body.website_fax_honey) {
      // Bot filled the hidden honeypot field
      return NextResponse.json({ success: true, message: 'Enquiry received.' });
    }

    const {
      type = 'WHOLESALE',
      businessName,
      contactPerson,
      phone,
      whatsapp,
      email,
      businessType,
      district,
      locality,
      productName,
      estimatedVolume,
      packagingPreference,
      deliveryFrequency,
      expectedStartDate,
      additionalNotes,
    } = body;

    // Server-side validation
    if (!businessName || businessName.trim().length < 2) {
      return NextResponse.json({ error: 'Business name is required (min 2 characters).' }, { status: 400 });
    }
    if (!contactPerson || contactPerson.trim().length < 2) {
      return NextResponse.json({ error: 'Contact person name is required.' }, { status: 400 });
    }
    if (!phone || phone.replace(/[^0-9]/g, '').length < 10) {
      return NextResponse.json({ error: 'Valid 10-digit phone number is required.' }, { status: 400 });
    }

    const newEnquiry = await prisma.enquiry.create({
      data: {
        type: type.toUpperCase(),
        businessName: businessName.trim(),
        contactPerson: contactPerson.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp?.trim() || phone.trim(),
        email: email?.trim() || null,
        businessType: businessType || 'Other Commercial Buyer',
        district: district || 'Adilabad',
        locality: locality?.trim() || null,
        productName: productName || 'Standard White Eggs (30-Egg Tray)',
        estimatedVolume: estimatedVolume?.trim() || 'Regular Supply',
        packagingPreference: packagingPreference || 'Standard Pulp Trays (30 Eggs)',
        deliveryFrequency: deliveryFrequency || 'Daily Morning Supply',
        expectedStartDate: expectedStartDate?.trim() || 'Immediate',
        additionalNotes: additionalNotes?.trim() || null,
        status: 'NEW',
        internalNotes: 'Web lead submitted via online quotation form.',
      },
    });

    // Record creation activity
    await prisma.enquiryActivity.create({
      data: {
        enquiryId: newEnquiry.id,
        actor: 'Web Portal',
        action: 'SUBMITTED',
        note: `New ${type} enquiry received for ${district || 'Telangana'}.`,
      },
    });

    return NextResponse.json({
      success: true,
      referenceId: newEnquiry.id,
      message: 'Your wholesale enquiry has been registered successfully with our Adilabad dispatch desk.',
    });
  } catch (error) {
    console.error('API /api/enquiries POST error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry. Please try again or reach us via WhatsApp.' }, { status: 500 });
  }
}
