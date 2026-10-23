const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Star Eggs Database Seed ---');

  // 1. Create Default Admin User
  const defaultAdminEmail = process.env.ADMIN_EMAIL || 'admin@stareggs.in';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('Admin@StarEggs2026', salt);

  const admin = await prisma.adminUser.upsert({
    where: { email: defaultAdminEmail },
    update: {},
    create: {
      email: defaultAdminEmail,
      name: 'Star Eggs Administrator',
      passwordHash: passwordHash,
      role: 'SUPERADMIN',
    },
  });
  console.log(`✔ Admin created: ${admin.email} (Password: Admin@StarEggs2026)`);

  // 2. Create Product Categories
  const categories = [
    {
      name: 'Wholesale Commercial Trays',
      slug: 'wholesale-commercial-trays',
      description: 'Standard 30-egg pulp trays and packed master cartons for retailers, bakeries, and bulk distributors.',
      sortOrder: 1,
    },
    {
      name: 'Farm Fresh White Eggs',
      slug: 'farm-fresh-white-eggs',
      description: 'Clean, candled, uniform table white eggs calibrated for daily retail and hospitality consumption.',
      sortOrder: 2,
    },
    {
      name: 'Brown & Specialty Eggs',
      slug: 'brown-and-specialty-eggs',
      description: 'Nutrient-rich brown shell eggs sourced for supermarkets, specialty grocers, and gourmet kitchens.',
      sortOrder: 3,
    },
    {
      name: 'Institutional & High-Volume Supply',
      slug: 'institutional-high-volume-supply',
      description: 'Scheduled multi-crate deliveries for hotels, catering chains, cloud kitchens, and institutional canteens.',
      sortOrder: 4,
    },
  ];

  const createdCategories = {};
  for (const cat of categories) {
    const record = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    createdCategories[cat.slug] = record.id;
  }
  console.log(`✔ Seeded ${categories.length} product categories.`);

  // 3. Create Products
  const products = [
    {
      name: 'Standard White Eggs (30-Egg Tray)',
      slug: 'standard-white-eggs-30-tray',
      categoryId: createdCategories['wholesale-commercial-trays'],
      description: 'Rigid paper pulp tray containing 30 graded, clean white eggs. Built for stackability, minimal shell shock during transit, and effortless retail display.',
      unitType: 'Pulp Tray (30 Eggs)',
      minOrderQty: '10 Trays (300 Eggs)',
      availabilityStatus: 'IN_STOCK',
      imageUrl: '/images/products/egg-tray.svg',
      isFeatured: true,
      sortOrder: 1,
    },
    {
      name: 'Commercial Wholesale Carton (210 Eggs)',
      slug: 'commercial-wholesale-carton-210-eggs',
      categoryId: createdCategories['wholesale-commercial-trays'],
      description: 'Heavy-duty corrugated master box housing 7 trays (210 eggs). Engineered for long-haul stability, distributor warehouse stocking, and bulk transit.',
      unitType: 'Master Box (210 Eggs)',
      minOrderQty: '5 Cartons (1,050 Eggs)',
      availabilityStatus: 'IN_STOCK',
      imageUrl: '/images/products/egg-carton.svg',
      isFeatured: true,
      sortOrder: 2,
    },
    {
      name: 'Select Table White Eggs (Bulk Loose / Crate)',
      slug: 'select-table-white-eggs-crate',
      categoryId: createdCategories['farm-fresh-white-eggs'],
      description: 'Uniform size-graded white eggs sorted through rigorous candling standards. Ideal for supermarkets, bakeries, and high-turnover grocery retail counters.',
      unitType: 'Commercial Crate (300-360 Eggs)',
      minOrderQty: '5 Crates',
      availabilityStatus: 'IN_STOCK',
      imageUrl: '/images/products/egg-cluster.svg',
      isFeatured: true,
      sortOrder: 3,
    },
    {
      name: 'Farm Fresh Brown Eggs (30-Egg Tray)',
      slug: 'farm-fresh-brown-eggs-30-tray',
      categoryId: createdCategories['brown-and-specialty-eggs'],
      description: 'Thick-shelled natural brown eggs with rich golden yolks. Available subject to farm batches; preferred by modern retail marts and boutique culinary businesses.',
      unitType: 'Pulp Tray (30 Eggs)',
      minOrderQty: '5 Trays (150 Eggs)',
      availabilityStatus: 'ORDER_ONLY',
      imageUrl: '/images/products/brown-eggs.svg',
      isFeatured: true,
      sortOrder: 4,
    },
    {
      name: 'Daily Standing Supply (Hotels & Caterers)',
      slug: 'daily-standing-supply-hotels-caterers',
      categoryId: createdCategories['institutional-high-volume-supply'],
      description: 'Dedicated morning replenishment contract for commercial kitchens, banquet halls, and industrial cafeterias requiring guaranteed daily volume consistency.',
      unitType: 'Custom Daily Standing Lot',
      minOrderQty: '20 Trays / Day',
      availabilityStatus: 'IN_STOCK',
      imageUrl: '/images/products/institutional-supply.svg',
      isFeatured: true,
      sortOrder: 5,
    },
    {
      name: 'Bakery Grade High-Volume Batch Lot',
      slug: 'bakery-grade-high-volume-batch',
      categoryId: createdCategories['institutional-high-volume-supply'],
      description: 'Optimized bulk egg procurement for industrial bakeries, confectioneries, and sweet manufacturers requiring continuous high-volume shell egg supply.',
      unitType: 'Batch Pallet / 50+ Cartons',
      minOrderQty: '50 Cartons (10,500 Eggs)',
      availabilityStatus: 'IN_STOCK',
      imageUrl: '/images/products/bakery-grade.svg',
      isFeatured: false,
      sortOrder: 6,
    },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: prod,
      create: prod,
    });
  }
  console.log(`✔ Seeded ${products.length} products.`);

  // 4. Seed all 33 Districts of Telangana
  const telanganaDistricts = [
    { districtName: 'Adilabad', status: 'CURRENTLY_SERVED', coverageHub: 'Star Eggs Head Office & Northern Hub Dispatch', sortOrder: 1 },
    { districtName: 'Hyderabad', status: 'CURRENTLY_SERVED', coverageHub: 'Central Logistics & Daily Dispatch Fleet', sortOrder: 2 },
    { districtName: 'Rangareddy', status: 'CURRENTLY_SERVED', coverageHub: 'South Zone Transit & Daily Delivery Routes', sortOrder: 3 },
    { districtName: 'Medchal-Malkajgiri', status: 'CURRENTLY_SERVED', coverageHub: 'North Ring Logistics Route', sortOrder: 4 },
    { districtName: 'Sangareddy', status: 'CURRENTLY_SERVED', coverageHub: 'West Industrial Belt Fleet', sortOrder: 5 },
    { districtName: 'Warangal', status: 'PLANNED_EXPANSION', coverageHub: 'Regional Distributor Hub in Planning', sortOrder: 5 },
    { districtName: 'Hanamkonda', status: 'PLANNED_EXPANSION', coverageHub: 'Scheduled Route Under Evaluation', sortOrder: 6 },
    { districtName: 'Karimnagar', status: 'PLANNED_EXPANSION', coverageHub: 'Distributor Partnership Applications Open', sortOrder: 7 },
    { districtName: 'Nizamabad', status: 'PLANNED_EXPANSION', coverageHub: 'Distributor Partnership Applications Open', sortOrder: 8 },
    { districtName: 'Khammam', status: 'PLANNED_EXPANSION', coverageHub: 'Enquiry Aggregation in Progress', sortOrder: 9 },
    { districtName: 'Nalgonda', status: 'PLANNED_EXPANSION', coverageHub: 'Partner Network Under Review', sortOrder: 10 },
    { districtName: 'Mahbubnagar', status: 'PLANNED_EXPANSION', coverageHub: 'Southern Corridor Evaluation', sortOrder: 11 },
    { districtName: 'Siddipet', status: 'PLANNED_EXPANSION', coverageHub: 'Transit Route In Pipeline', sortOrder: 12 },
    { districtName: 'Yadadri Bhuvanagiri', status: 'PLANNED_EXPANSION', coverageHub: 'Highway Corridor Route', sortOrder: 13 },
    { districtName: 'Bhadradri Kothagudem', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 15 },
    { districtName: 'Jagtial', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 16 },
    { districtName: 'Jangaon', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 17 },
    { districtName: 'Jayashankar Bhupalpally', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 18 },
    { districtName: 'Jogulamba Gadwal', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 19 },
    { districtName: 'Kamareddy', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 20 },
    { districtName: 'Komaram Bheem Asifabad', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 21 },
    { districtName: 'Mahabubabad', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 22 },
    { districtName: 'Mancherial', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 23 },
    { districtName: 'Medak', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 24 },
    { districtName: 'Mulugu', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 25 },
    { districtName: 'Nagarkurnool', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 26 },
    { districtName: 'Narayanpet', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 27 },
    { districtName: 'Nirmal', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 28 },
    { districtName: 'Peddapalli', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 29 },
    { districtName: 'Rajanna Sircilla', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 30 },
    { districtName: 'Suryapet', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 31 },
    { districtName: 'Vikarabad', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 32 },
    { districtName: 'Wanaparthy', status: 'ENQUIRE_AVAILABILITY', coverageHub: 'Direct Contact to Schedule', sortOrder: 33 },
  ];

  for (const dist of telanganaDistricts) {
    await prisma.districtCoverage.upsert({
      where: { districtName: dist.districtName },
      update: dist,
      create: dist,
    });
  }
  console.log(`✔ Seeded 33 Telangana districts.`);

  // 5. Seed Initial Settings
  const settings = [
    { key: 'BUSINESS_NAME', value: 'STAR EGGS', description: 'Official registered trade name' },
    { key: 'PRIMARY_PHONE', value: '+91 98765 43210', description: 'Primary business phone number' },
    { key: 'WHATSAPP_NUMBER', value: '919876543210', description: 'Official WhatsApp direct chat number' },
    { key: 'CONTACT_EMAIL', value: 'enquiry@stareggs.in', description: 'Official commercial enquiries email' },
    { key: 'HEAD_OFFICE_ADDRESS', value: 'Commercial Complex, Market Road, Near Old Bus Stand, Adilabad, Telangana 504001', description: 'Registered Head Office & Northern Hub address' },
    { key: 'GOOGLE_MAPS_LINK', value: 'https://maps.app.goo.gl/BzzxbCL7VV8kjbS26', description: 'Official Google Maps shop and warehouse location link' },
    { key: 'BUSINESS_HOURS', value: 'Monday - Saturday: 5:00 AM – 8:00 PM IST | Sunday: 5:00 AM – 1:00 PM IST', description: 'Warehouse and dispatch operations schedule' },
    { key: 'ANNOUNCEMENT_BANNER', value: 'Head Office in Adilabad • Serving Across Telangana with Direct Farm-to-Business Logistics', description: 'Header announcement marquee banner' },
  ];

  for (const s of settings) {
    await prisma.setting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`✔ Seeded site configuration settings.`);

  // 6. Sample Initial Enquiries for Admin View
  const countEnquiries = await prisma.enquiry.count();
  if (countEnquiries === 0) {
    const sample1 = await prisma.enquiry.create({
      data: {
        type: 'WHOLESALE',
        businessName: 'Sri Balaji Supermart & Bakers',
        contactPerson: 'K. Venkatesh',
        phone: '+91 98490 12345',
        whatsapp: '+91 98490 12345',
        email: 'procurement@balajimart.com',
        businessType: 'Supermarket',
        district: 'Hyderabad',
        locality: 'Kukatpally Housing Board Colony',
        productName: 'Standard White Eggs (30-Egg Tray)',
        estimatedVolume: '60 Trays Daily',
        packagingPreference: 'Pulp Trays',
        deliveryFrequency: 'Daily',
        expectedStartDate: 'Immediate',
        additionalNotes: 'Require early morning delivery before 7:00 AM daily. Looking for volume contract pricing.',
        status: 'NEW',
        internalNotes: 'Contacted customer regarding Kukatpally route slot. Pending dispatch confirmation.',
      },
    });

    await prisma.enquiryActivity.create({
      data: {
        enquiryId: sample1.id,
        actor: 'Admin',
        action: 'CREATED',
        note: 'Initial web enquiry submitted through wholesale portal.',
      },
    });

    const sample2 = await prisma.enquiry.create({
      data: {
        type: 'RETAIL',
        businessName: 'Deccan Royal Biryani & Caterers',
        contactPerson: 'Mohammed Farooq',
        phone: '+91 97000 54321',
        whatsapp: '+91 97000 54321',
        email: 'royalbiryani.hyd@gmail.com',
        businessType: 'Hotel or Restaurant',
        district: 'Rangareddy',
        locality: 'Gachibowli Financial District',
        productName: 'Commercial Wholesale Carton (210 Eggs)',
        estimatedVolume: '15 Cartons Weekly',
        packagingPreference: 'Master Cartons',
        deliveryFrequency: 'Alternate Days',
        expectedStartDate: 'Next Monday',
        additionalNotes: 'Need consistency in egg size and break-free delivery. Please share wholesale tier rates.',
        status: 'QUOTATION_SENT',
        internalNotes: 'Quotation tier-2 shared via WhatsApp. Awaiting procurement sign-off.',
      },
    });

    await prisma.enquiryActivity.create({
      data: {
        enquiryId: sample2.id,
        actor: 'Sales Team',
        action: 'STATUS_CHANGE',
        note: 'Quotation sent via email and WhatsApp follow-up scheduled.',
      },
    });

    console.log(`✔ Created sample customer enquiries.`);
  }

  // 7. Sample Distribution Partner Application
  const countApps = await prisma.distributionApplication.count();
  if (countApps === 0) {
    await prisma.distributionApplication.create({
      data: {
        businessName: 'Kakatiya Agro Logistics & Traders',
        applicantName: 'Ramesh Reddy',
        phone: '+91 94400 98765',
        whatsapp: '+91 94400 98765',
        email: 'ramesh.kakatiya@yahoo.com',
        preferredDistricts: 'Warangal, Hanamkonda, Jangaon',
        coldStorageCapacity: '2,500 sq ft covered warehouse facility in Warangal Industrial Zone',
        deliveryFleet: '3 Light Commercial Vehicles (Tata Ace / Ashok Leyland Dost)',
        currentExperience: '12 years in FMCG, dairy and poultry distribution in northern Telangana',
        monthlyDemandEstimated: '12,000 Trays (360,000 Eggs) per month',
        status: 'IN_REVIEW',
        internalNotes: 'Impressive existing fleet and retail network in Warangal. Scheduled telephonic verification.',
      },
    });
    console.log(`✔ Created sample distribution partner application.`);
  }

  console.log('--- Database Seed Completed Successfully ---');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
