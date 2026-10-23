const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

async function runTests() {
  console.log('==================================================');
  console.log('🧪 RUNNING STAR EGGS SYSTEM & DATABASE VALIDATION');
  console.log('==================================================');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✔ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Verify Districts
  const districts = await prisma.districtCoverage.findMany();
  assert(districts.length === 33, `Database has all 33 Telangana districts (found: ${districts.length})`);
  const activeDistricts = districts.filter(d => d.status === 'CURRENTLY_SERVED');
  assert(activeDistricts.length >= 3, `Active served hubs identified (found: ${activeDistricts.length})`);

  // 2. Verify Products
  const products = await prisma.product.findMany();
  assert(products.length >= 6, `Catalog has 6+ configured products (found: ${products.length})`);

  // 3. Verify Admin Authentication
  const admin = await prisma.adminUser.findUnique({ where: { email: 'admin@stareggs.in' } });
  assert(admin !== null, 'Admin user account exists');
  const passwordMatch = await bcrypt.compare('Admin@StarEggs2026', admin.passwordHash);
  assert(passwordMatch === true, 'Admin password hashes and verifies with bcrypt correctly');

  // 4. Test Enquiry Insertion & Activity Logging
  const testEnquiry = await prisma.enquiry.create({
    data: {
      type: 'WHOLESALE',
      businessName: 'Automated Test Supermarket',
      contactPerson: 'QA Verification Bot',
      phone: '+91 99999 11111',
      whatsapp: '+91 99999 11111',
      district: 'Hyderabad',
      locality: 'Banjara Hills',
      productName: 'Standard White Eggs (30-Egg Tray)',
      estimatedVolume: '100 Trays',
      status: 'NEW',
    },
  });
  assert(testEnquiry.id !== undefined, `Wholesale enquiry created with ID: ${testEnquiry.id}`);

  const activity = await prisma.enquiryActivity.create({
    data: {
      enquiryId: testEnquiry.id,
      actor: 'QA Bot',
      action: 'SYSTEM_TEST',
      note: 'Validation test execution.',
    },
  });
  assert(activity.id !== undefined, 'Activity log record attached successfully');

  // 5. Test Distribution Partner Application
  const testDistApp = await prisma.distributionApplication.create({
    data: {
      businessName: 'Deccan Regional Logistics',
      applicantName: 'Test Partner',
      phone: '+91 98888 22222',
      preferredDistricts: 'Warangal, Karimnagar',
      status: 'NEW',
    },
  });
  assert(testDistApp.id !== undefined, `Distributor application created with ID: ${testDistApp.id}`);

  // 6. Test Settings
  const settings = await prisma.setting.findMany();
  assert(settings.length >= 5, `Settings initialized (found: ${settings.length})`);

  // Cleanup test records
  await prisma.enquiry.delete({ where: { id: testEnquiry.id } });
  await prisma.distributionApplication.delete({ where: { id: testDistApp.id } });
  console.log('  ✔ Cleaned up temporary test records.');

  console.log('==================================================');
  console.log(`SUMMARY: ${passed} passed, ${failed} failed.`);
  console.log('==================================================');

  await prisma.$disconnect();
  if (failed > 0) process.exit(1);
}

runTests().catch((e) => {
  console.error('Test execution failed:', e);
  process.exit(1);
});
