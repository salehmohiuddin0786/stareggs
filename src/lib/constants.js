export const TELANGANA_DISTRICTS = [
  'Hyderabad',
  'Rangareddy',
  'Medchal-Malkajgiri',
  'Sangareddy',
  'Warangal',
  'Hanamkonda',
  'Karimnagar',
  'Nizamabad',
  'Khammam',
  'Nalgonda',
  'Mahbubnagar',
  'Siddipet',
  'Yadadri Bhuvanagiri',
  'Adilabad',
  'Bhadradri Kothagudem',
  'Jagtial',
  'Jangaon',
  'Jayashankar Bhupalpally',
  'Jogulamba Gadwal',
  'Kamareddy',
  'Komaram Bheem Asifabad',
  'Mahabubabad',
  'Mancherial',
  'Medak',
  'Mulugu',
  'Nagarkurnool',
  'Narayanpet',
  'Nirmal',
  'Peddapalli',
  'Rajanna Sircilla',
  'Suryapet',
  'Vikarabad',
  'Wanaparthy',
];

export const BUSINESS_TYPES = [
  'Wholesaler / Bulk Trader',
  'Retailer / Kirana Shop',
  'Supermarket / Hypermarket',
  'Hotel or Restaurant',
  'Bakery / Confectionery',
  'Caterer / Event Service',
  'Cloud Kitchen / Food Chain',
  'Institutional / Hostel Canteen',
  'Other Commercial Buyer',
];

export const PACKAGING_OPTIONS = [
  'Standard Pulp Trays (30 Eggs)',
  'Commercial Master Cartons (210 Eggs / 7 Trays)',
  'Heavy-Duty Plastic Crates (300-360 Eggs)',
  'Custom Bulk Order / Pallet Load',
];

export const DELIVERY_FREQUENCIES = [
  'Daily Morning Supply (Standing Order)',
  'Alternate Days',
  'Twice Weekly',
  'Weekly Bulk Load',
  'One-Time Commercial Order',
];

export const ENQUIRY_STATUSES = {
  NEW: { label: 'New', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  CONTACTED: { label: 'Contacted', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  QUOTATION_SENT: { label: 'Quotation Sent', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  IN_DISCUSSION: { label: 'In Discussion', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
  APPROVED: { label: 'Approved', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  REJECTED: { label: 'Rejected', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
  COMPLETED: { label: 'Completed', color: 'bg-emerald-600/20 text-emerald-300 border-emerald-500/40' },
};

export const DISTRICT_STATUSES = {
  CURRENTLY_SERVED: {
    label: 'Currently Served',
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400',
    description: 'Active daily logistics route with guaranteed regular delivery slots.',
  },
  PLANNED_EXPANSION: {
    label: 'Planned Expansion',
    badge: 'bg-cobalt-500/20 text-brand-blue border-brand-blue/30',
    dot: 'bg-brand-blue',
    description: 'Regional corridor under route onboarding; distribution applications prioritized.',
  },
  ENQUIRE_AVAILABILITY: {
    label: 'Contact us to confirm availability',
    badge: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    dot: 'bg-slate-400',
    description: 'Custom bulk dispatch available on confirmed volume enquiry.',
  },
};
