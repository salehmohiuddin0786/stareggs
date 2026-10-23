'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, Truck, Clock, ArrowUpRight, Search, CheckCircle2, ChevronRight } from 'lucide-react';
import { TELANGANA_DISTRICTS, DISTRICT_STATUSES } from '@/lib/constants';
import Button from '@/components/common/Button';
import ScrollReveal from '@/components/motion/ScrollReveal';

// Verified district data matching database seed
const initialDistrictData = [
  { name: 'Adilabad', status: 'CURRENTLY_SERVED', hub: 'Star Eggs Head Office & Northern Hub Dispatch' },
  { name: 'Hyderabad', status: 'CURRENTLY_SERVED', hub: 'Central Logistics & Daily Dispatch Fleet' },
  { name: 'Rangareddy', status: 'CURRENTLY_SERVED', hub: 'South Zone Transit & Daily Delivery Routes' },
  { name: 'Medchal-Malkajgiri', status: 'CURRENTLY_SERVED', hub: 'North Ring Logistics Route' },
  { name: 'Sangareddy', status: 'CURRENTLY_SERVED', hub: 'West Industrial Belt Fleet' },
  { name: 'Warangal', status: 'PLANNED_EXPANSION', hub: 'Regional Distributor Hub in Planning' },
  { name: 'Hanamkonda', status: 'PLANNED_EXPANSION', hub: 'Scheduled Route Under Evaluation' },
  { name: 'Karimnagar', status: 'PLANNED_EXPANSION', hub: 'Distributor Partnership Applications Open' },
  { name: 'Nizamabad', status: 'PLANNED_EXPANSION', hub: 'Distributor Partnership Applications Open' },
  { name: 'Khammam', status: 'PLANNED_EXPANSION', hub: 'Enquiry Aggregation in Progress' },
  { name: 'Nalgonda', status: 'PLANNED_EXPANSION', hub: 'Partner Network Under Review' },
  { name: 'Mahbubnagar', status: 'PLANNED_EXPANSION', hub: 'Southern Corridor Evaluation' },
  { name: 'Siddipet', status: 'PLANNED_EXPANSION', hub: 'Transit Route In Pipeline' },
  { name: 'Yadadri Bhuvanagiri', status: 'PLANNED_EXPANSION', hub: 'Highway Corridor Route' },
  { name: 'Bhadradri Kothagudem', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Jagtial', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Jangaon', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Jayashankar Bhupalpally', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Jogulamba Gadwal', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Kamareddy', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Komaram Bheem Asifabad', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Mahabubabad', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Mancherial', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Medak', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Mulugu', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Nagarkurnool', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Narayanpet', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Nirmal', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Peddapalli', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Rajanna Sircilla', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Suryapet', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Vikarabad', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
  { name: 'Wanaparthy', status: 'ENQUIRE_AVAILABILITY', hub: 'Direct Contact to Schedule' },
];

export default function TelanganaMap() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrictData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredDistricts = initialDistrictData.filter((d) => {
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'ALL' || d.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleSelectDistrict = (district) => {
    setSelectedDistrict(district);
  };

  const handleProceedEnquiry = (districtName) => {
    router.push(`/wholesale?district=${encodeURIComponent(districtName)}`);
  };

  return (
    <section id="telangana-coverage" className="py-24 bg-brand-navy-dark relative overflow-hidden border-t border-slate-800">
      {/* Dynamic Background Network Glows */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-brand-red/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-navy border border-brand-blue/40 text-xs font-bold uppercase tracking-widest text-brand-blue">
              <Truck className="w-3.5 h-3.5 text-brand-red" />
              <span>REGIONAL LOGISTICS REACH</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-tight">
              ONE TRUSTED SUPPLY NETWORK.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-blue-400 to-white">
                ACROSS TELANGANA.
              </span>
            </h2>

            <p className="text-brand-muted text-base leading-relaxed">
              Star Eggs operates dedicated morning replenishment fleets across Greater Hyderabad while systematically onboarding regional distribution hubs across all 33 districts of Telangana.
            </p>
          </div>
        </ScrollReveal>

        {/* Status Legend Bar */}
        <ScrollReveal direction="up" delay={0.15}>
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-2xl bg-brand-navy/90 border border-slate-800 mb-10 text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider">
              Coverage Status Key:
            </span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold">Currently Served (Daily Fleet)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-blue" />
              <span className="text-blue-300 font-semibold">Planned Expansion (Hub Onboarding)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
              <span className="text-slate-300 font-semibold">Contact us to confirm availability</span>
            </div>
          </div>
        </ScrollReveal>

        {/* Two-Column Interactive District Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Abstract Regional Network Visualization */}
          <ScrollReveal direction="left" delay={0.2} className="lg:col-span-7 w-full">
            <div className="rounded-2xl bg-brand-navy border border-slate-800 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* SVG Network Map */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              <svg
                viewBox="0 0 600 500"
                className="w-full h-full filter drop-shadow-xl select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Telangana Territory Boundary Silhouette */}
                <path
                  d="M190 60 L320 40 L450 70 L510 130 L550 220 L510 320 L440 420 L320 470 L200 450 L120 370 L80 260 L110 150 Z"
                  fill="#071426"
                  stroke="#1E293B"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Logistics Route Lines from Central Hyderabad Hub */}
                {/* To Warangal */}
                <line x1="280" y1="260" x2="380" y2="210" stroke="#174BFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                {/* To Karimnagar */}
                <line x1="280" y1="260" x2="340" y2="150" stroke="#174BFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                {/* To Nizamabad */}
                <line x1="280" y1="260" x2="220" y2="150" stroke="#174BFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                {/* To Khammam */}
                <line x1="280" y1="260" x2="430" y2="300" stroke="#174BFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                {/* To Mahbubnagar */}
                <line x1="280" y1="260" x2="240" y2="360" stroke="#174BFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                {/* To Nalgonda */}
                <line x1="280" y1="260" x2="340" y2="330" stroke="#174BFF" strokeWidth="2" strokeDasharray="3 3" opacity="0.6" />
                {/* Local Ring to Rangareddy & Medchal */}
                <circle cx="280" cy="260" r="45" stroke="#10B981" strokeWidth="2" fill="none" opacity="0.4" />

                {/* Major Regional Hub Nodes */}
                {/* Central Hyderabad Base */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Hyderabad'))}
                >
                  <circle cx="280" cy="260" r="18" fill="#174BFF" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="280" cy="260" r="10" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
                  <text x="280" y="292" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
                    HYDERABAD (ACTIVE HUB)
                  </text>
                </g>

                {/* Warangal Node */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Warangal'))}
                >
                  <circle cx="380" cy="210" r="7" fill="#174BFF" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="390" y="215" fill="#AAB7CC" fontSize="11" fontWeight="600">
                    Warangal
                  </text>
                </g>

                {/* Karimnagar Node */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Karimnagar'))}
                >
                  <circle cx="340" cy="150" r="7" fill="#174BFF" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="350" y="155" fill="#AAB7CC" fontSize="11" fontWeight="600">
                    Karimnagar
                  </text>
                </g>

                {/* Nizamabad Node */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Nizamabad'))}
                >
                  <circle cx="220" cy="150" r="7" fill="#174BFF" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="210" y="140" fill="#AAB7CC" fontSize="11" fontWeight="600" textAnchor="middle">
                    Nizamabad
                  </text>
                </g>

                {/* Khammam Node */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Khammam'))}
                >
                  <circle cx="430" cy="300" r="7" fill="#174BFF" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="440" y="305" fill="#AAB7CC" fontSize="11" fontWeight="600">
                    Khammam
                  </text>
                </g>

                {/* Mahbubnagar Node */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Mahbubnagar'))}
                >
                  <circle cx="240" cy="360" r="7" fill="#174BFF" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="230" y="380" fill="#AAB7CC" fontSize="11" fontWeight="600" textAnchor="middle">
                    Mahbubnagar
                  </text>
                </g>

                {/* Nalgonda Node */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Nalgonda'))}
                >
                  <circle cx="340" cy="330" r="7" fill="#174BFF" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="350" y="335" fill="#AAB7CC" fontSize="11" fontWeight="600">
                    Nalgonda
                  </text>
                </g>

                {/* Route connecting Head Office Adilabad to Nizamabad & Hyderabad */}
                <line x1="250" y1="75" x2="220" y2="150" stroke="#FF303B" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />

                {/* Adilabad Node (North - Head Office) */}
                <g
                  className="cursor-pointer"
                  onClick={() => handleSelectDistrict(initialDistrictData.find(d => d.name === 'Adilabad'))}
                >
                  <circle cx="250" cy="75" r="14" fill="#FF303B" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="250" cy="75" r="9" fill="#FF303B" stroke="#FFFFFF" strokeWidth="2.5" />
                  <text x="250" y="55" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ★ ADILABAD (HEAD OFFICE)
                  </text>
                </g>
              </svg>
            </div>

            {/* Selected District Callout Drawer */}
            <div className="mt-4 p-5 rounded-xl bg-brand-navy-dark border border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-display text-lg font-bold text-white">
                    {selectedDistrict.name} District
                  </h4>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      DISTRICT_STATUSES[selectedDistrict.status].badge
                    }`}
                  >
                    {DISTRICT_STATUSES[selectedDistrict.status].label}
                  </span>
                </div>
                <p className="text-xs text-brand-muted">
                  {selectedDistrict.hub}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {selectedDistrict.name === 'Adilabad' && (
                  <a
                    href={process.env.NEXT_PUBLIC_GOOGLE_MAPS_LINK || 'https://maps.app.goo.gl/BzzxbCL7VV8kjbS26'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-brand-red/15 text-brand-red border border-brand-red/40 hover:bg-brand-red hover:text-white transition shadow-sm"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Shop Location</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}
                <Button
                  onClick={() => handleProceedEnquiry(selectedDistrict.name)}
                  variant="primary"
                  size="sm"
                  icon={ArrowUpRight}
                  className="whitespace-nowrap"
                >
                  Enquire for {selectedDistrict.name}
                </Button>
              </div>
            </div>
          </div>
          </ScrollReveal>

          {/* Right Column: Searchable All-33 Districts Directory */}
          <ScrollReveal direction="right" delay={0.25} className="lg:col-span-5 w-full">
            <div className="rounded-2xl bg-brand-navy border border-slate-800 p-6 flex flex-col h-[560px]">
            <div className="space-y-3 pb-4 border-b border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">
                  Telangana District Directory
                </h3>
                <span className="text-xs text-brand-muted">
                  {filteredDistricts.length} / 33 Districts
                </span>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search district name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-navy-dark border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-blue"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
                <button
                  onClick={() => setFilterStatus('ALL')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide whitespace-nowrap transition ${
                    filterStatus === 'ALL'
                      ? 'bg-white/10 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterStatus('CURRENTLY_SERVED')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide whitespace-nowrap transition ${
                    filterStatus === 'CURRENTLY_SERVED'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  Currently Served
                </button>
                <button
                  onClick={() => setFilterStatus('PLANNED_EXPANSION')}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wide whitespace-nowrap transition ${
                    filterStatus === 'PLANNED_EXPANSION'
                      ? 'bg-brand-blue/20 text-brand-blue'
                      : 'text-slate-400 hover:text-brand-blue'
                  }`}
                >
                  Planned Expansion
                </button>
              </div>
            </div>

            {/* Scrollable District List */}
            <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1">
              {filteredDistricts.map((dist) => {
                const isSelected = selectedDistrict.name === dist.name;
                const statusMeta = DISTRICT_STATUSES[dist.status];

                return (
                  <div
                    key={dist.name}
                    onClick={() => handleSelectDistrict(dist)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border transition-all ${
                      isSelected
                        ? 'bg-brand-blue/15 border-brand-blue text-white shadow-sm'
                        : 'bg-brand-navy-dark/60 border-slate-800/80 hover:bg-white/5 text-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${statusMeta.dot}`} />
                        <span className="font-semibold text-xs text-white">
                          {dist.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 pl-4 truncate max-w-[210px]">
                        {dist.hub}
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProceedEnquiry(dist.name);
                      }}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-brand-blue hover:text-white text-slate-400 transition"
                      title={`Request quotation for ${dist.name}`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Bottom Partnership Callout */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Want to distribute in your district?</span>
              <Link
                href="/distribution"
                className="text-brand-red font-bold hover:text-red-400 transition inline-flex items-center gap-1"
              >
                <span>Partner Form</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
