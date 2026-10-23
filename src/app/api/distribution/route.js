import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getAdminSession } from '@/lib/auth';

function convertDistributorAppsToCSV(data) {
  if (!data || data.length === 0) return '';
  const headers = [
    'Application ID',
    'Date',
    'Business Name',
    'Applicant Name',
    'Phone',
    'WhatsApp',
    'Email',
    'Target Districts',
    'Cold Storage Capacity',
    'Delivery Fleet',
    'Current Experience',
    'Estimated Monthly Demand',
    'Status',
  ];

  const rows = data.map((item) => [
    `"${item.id}"`,
    `"${new Date(item.createdAt).toISOString()}"`,
    `"${(item.businessName || '').replace(/"/g, '""')}"`,
    `"${(item.applicantName || '').replace(/"/g, '""')}"`,
    `"${item.phone || ''}"`,
    `"${item.whatsapp || ''}"`,
    `"${item.email || ''}"`,
    `"${(item.preferredDistricts || '').replace(/"/g, '""')}"`,
    `"${(item.coldStorageCapacity || '').replace(/"/g, '""')}"`,
    `"${(item.deliveryFleet || '').replace(/"/g, '""')}"`,
    `"${(item.currentExperience || '').replace(/"/g, '""')}"`,
    `"${item.monthlyDemandEstimated || ''}"`,
    `"${item.status || ''}"`,
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}

export async function GET(request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const isExport = searchParams.get('export') === 'csv';

    const applications = await prisma.distributionApplication.findMany({
      orderBy: { createdAt: 'desc' },
    });

    if (isExport) {
      const csv = convertDistributorAppsToCSV(applications);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="stareggs-distributor-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
        },
      });
    }

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('API /api/distribution GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Anti-spam honeypot
    if (body.website_fax_honey) {
      return NextResponse.json({ success: true, message: 'Application received.' });
    }

    const {
      businessName,
      applicantName,
      phone,
      whatsapp,
      email,
      preferredDistricts,
      coldStorageCapacity,
      deliveryFleet,
      currentExperience,
      monthlyDemandEstimated,
    } = body;

    // Server-side validation
    if (!businessName || businessName.trim().length < 2) {
      return NextResponse.json({ error: 'Business name is required.' }, { status: 400 });
    }
    if (!applicantName || applicantName.trim().length < 2) {
      return NextResponse.json({ error: 'Applicant name is required.' }, { status: 400 });
    }
    if (!phone || phone.replace(/[^0-9]/g, '').length < 10) {
      return NextResponse.json({ error: 'Valid 10-digit phone number is required.' }, { status: 400 });
    }
    if (!preferredDistricts) {
      return NextResponse.json({ error: 'Please specify target district(s).' }, { status: 400 });
    }

    const app = await prisma.distributionApplication.create({
      data: {
        businessName: businessName.trim(),
        applicantName: applicantName.trim(),
        phone: phone.trim(),
        whatsapp: whatsapp?.trim() || phone.trim(),
        email: email?.trim() || null,
        preferredDistricts: Array.isArray(preferredDistricts)
          ? preferredDistricts.join(', ')
          : preferredDistricts.trim(),
        coldStorageCapacity: coldStorageCapacity?.trim() || 'Not specified',
        deliveryFleet: deliveryFleet?.trim() || 'Not specified',
        currentExperience: currentExperience?.trim() || 'Not specified',
        monthlyDemandEstimated: monthlyDemandEstimated?.trim() || 'Under evaluation',
        status: 'NEW',
      },
    });

    return NextResponse.json({
      success: true,
      referenceId: app.id,
      message: 'Distribution partnership application registered. Operations team will contact you.',
    });
  } catch (error) {
    console.error('API /api/distribution POST error:', error);
    return NextResponse.json({ error: 'Failed to submit application' }, { status: 500 });
  }
}
