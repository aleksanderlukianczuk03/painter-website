import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions"
};

export default function TermsPage() {
  return (
    <div className="premium-container py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header Section - Two Column Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Page Title and Info */}
          <div className="text-left space-y-6">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-serif font-light tracking-tight leading-none">
                Terms & Conditions
              </h1>
            </div>
            
           
            
           
          </div>

          {/* Right: Quote or Legal Note */}
          <div className="text-center lg:text-right">
            <p className="text-muted-foreground text-sm tracking-[0.1em] uppercase font-light">
              Purchase Terms • Shipping • Authenticity
            </p>
          </div>
        </div>
 <div className="elegant-divider mx-0"></div>
        {/* Content Sections */}
        <div className="space-y-16">
          {/* Purchase Terms */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">Purchase Terms</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                All original paintings are one-of-a-kind artworks. Once purchased, the piece becomes the exclusive property of the buyer. No reproductions, prints, or digital copies are included with the purchase.
              </p>
              <p>
                Payment is processed securely through Stripe. All sales are final upon completion of purchase. We accept major credit cards and select digital payment methods.
              </p>
              <p>
                Prices are listed in USD and do not include shipping costs, which are calculated at checkout based on your location.
              </p>
            </div>
          </section>

          {/* Shipping & Handling */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">Shipping & Handling</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                Each painting is carefully packaged with museum-quality materials to ensure safe transit. We use professional art shipping services for all deliveries.
              </p>
              <p>
                Domestic shipping typically takes 5-10 business days. International shipping may take 10-21 business days depending on location and customs processing.
              </p>
              <p>
                All shipments include tracking information and insurance coverage for the full purchase value. Signature confirmation is required upon delivery.
              </p>
              <p>
                Shipping costs vary by destination and artwork size. International buyers are responsible for any customs duties or import taxes.
              </p>
            </div>
          </section>

          {/* Authenticity & Care */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">Authenticity & Care</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                Every original painting includes a signed Certificate of Authenticity detailing the artwork's provenance, materials, and creation date.
              </p>
              <p>
                Paintings are created using professional-grade oil paints on premium linen canvas, ensuring longevity when properly cared for.
              </p>
              <p>
                Care instructions are provided with each purchase. We recommend professional framing with UV-protective glass and climate-controlled display conditions.
              </p>
            </div>
          </section>

          {/* Returns & Damage */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">Returns & Damage</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                Due to the unique nature of original artworks, returns are only accepted in cases of shipping damage or significant misrepresentation of the artwork.
              </p>
              <p>
                Any damage must be reported within 48 hours of delivery with photographic evidence. We will arrange for professional restoration or replacement at our discretion.
              </p>
              <p>
                Buyers have 7 days to inspect their purchase upon delivery. All claims must be submitted within this timeframe.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">Questions</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                For questions about specific artworks, shipping, or any other inquiries, please contact us through our website or social media channels. We aim to respond to all inquiries within 24 hours.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase font-light">
            Terms updated June 2025 • No Taboo Paintings
          </p>
        </div>
      </div>
    </div>
  );
}