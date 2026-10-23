export const metadata = {
  title: 'Terms & Conditions',
  description: 'Star Eggs Commercial Terms & Conditions for wholesale and retail egg procurement.',
};

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24 bg-brand-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-brand-muted text-sm leading-relaxed">
        <h1 className="font-display text-3xl sm:text-5xl font-black uppercase text-white tracking-tight">
          COMMERCIAL TERMS & CONDITIONS
        </h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">1. Quotations & Market Rate Index</h2>
          <p>
            Wholesale egg prices are indexed to regional market benchmarks and are subject to regular revision based on farm gate costs and transport logistics. Price quotations provided on this website or via commercial desk become binding only upon written confirmation by Star Eggs operations management.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">2. Order Confirmation & Delivery Windows</h2>
          <p>
            Standing orders and commercial loads are scheduled based on route availability. Deliveries are carried out during morning transit windows. Unloading facilities and dock access must be provided by the receiving party at the scheduled arrival time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">3. Transit Inspection & Breakage Policy</h2>
          <p>
            While eggs are packed in specialized anti-shock pulp trays and heavy-duty corrugated cartons, physical inspection must occur upon arrival. Any documented transit damage noted on the delivery receipt will be adjusted or credited against subsequent consignments.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-display text-lg font-bold text-white uppercase">4. Distribution Partnerships</h2>
          <p>
            Submission of a distribution partnership application does not constitute a grant of exclusive territorial rights or dealership agreement until formal commercial agreements are executed by both parties.
          </p>
        </section>
      </div>
    </div>
  );
}
