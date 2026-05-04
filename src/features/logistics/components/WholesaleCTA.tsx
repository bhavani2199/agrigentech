const WHATSAPP_NUMBER = "911234567890"; // replace with real number
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi, I'm interested in wholesale pricing for Agrigentech produce. Could you share details?"
);
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WholesaleCTA() {
  return (
    <section className="bg-brand-forest px-6 py-28">
      <div className="mx-auto max-w-3xl">

        {/*
          Flexbox column here: the content is a single vertical stack of items
          centred on one axis. There's no grid of rows and columns to manage —
          just top-to-bottom centering. Flexbox is the right tool for any
          single-direction layout. Grid would add column overhead for no reason.
        */}
        <div className="flex flex-col items-center gap-8 text-center">

          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-gold">
            Bulk &amp; Wholesale
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Ready to source at scale?
          </h2>

          <p className="max-w-xl text-base leading-relaxed text-white/70">
            We supply hotels, supermarket chains, processors, and exporters.
            Minimum order quantities start at 500 kg. Reach our sales team
            directly on WhatsApp for a custom quote within 24 hours.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Contact Sales on WhatsApp
            </a>

            <a
              href="/contact"
              className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white/80 transition-all duration-200 hover:border-white/50 hover:text-white"
            >
              Request a Brochure
            </a>
          </div>

          <p className="text-xs text-white/40">
            Response guaranteed within 24 hours · No commitment required
          </p>
        </div>

      </div>
    </section>
  );
}
