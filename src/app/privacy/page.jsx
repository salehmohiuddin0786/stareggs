export const metadata = {
  title: 'Privacy Policy',
  description: 'Star Eggs Commercial Privacy Policy regarding customer and commercial enquiry data.',
};

export default function PrivacyPage() {
  return (
    <div className="py-16 md:py-24 bg-brand-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-brand-muted text-sm leading-relaxed">
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">1. Commercial Data Collection</h2>
          <p>
            STAR EGGS collects business and contact information (including business name, representative name, telephone number, WhatsApp number, email address, delivery district, and volume requirements) solely for the purpose of preparing commercial egg supply quotations, processing bulk orders, and managing regional distribution partnerships.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">2. Use of Information</h2>
          <p>
            Your information is used strictly to communicate daily wholesale rate indices, verify delivery route availability, coordinate morning logistics dispatches, and manage billing arrangements. We do not sell or rent commercial partner information to any third-party marketing companies.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">3. Data Security & Storage</h2>
          <p>
            All submitted enquiries are stored within protected, access-controlled operational databases. Access is restricted to authorized commercial operations personnel for dispatch coordination.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">4. Contact Desk</h2>
          <p>
            For privacy inquiries or updates regarding your commercial account record, contact our operations desk at{' '}
            <span className="text-white">enquiry@stareggs.in</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
