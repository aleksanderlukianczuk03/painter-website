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
              Purchase Terms • Shipping • Returns • Authenticity
            </p>
          </div>
        </div>
        <div className="elegant-divider mx-0"></div>
        
        {/* Content Sections */}
        <div className="space-y-16">
          {/* Last Updated */}
          <section className="space-y-6">
            <p className="text-sm text-muted-foreground font-light">
              Last updated: 29 June 2025
            </p>
          </section>

          {/* Overview */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">1. Overview</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                These Terms & Conditions (&ldquo;Terms&rdquo;) govern every purchase of original oil paintings (&ldquo;Artwork&rdquo;) made through Aleksander Lukianczuk – [lukianczuk.com] (&ldquo;Site,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;). Completing a purchase signifies that you have read, understood, and agree to be bound by these Terms.
              </p>
            </div>
          </section>

          {/* One-of-a-Kind Originals */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">2. One-of-a-Kind Originals</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                Each Artwork is a single, unique creation. No prints, giclées, or digital downloads are included or authorised unless expressly stated in the product listing. You acquire physical ownership only; the artist retains all copyright and reproduction rights.
              </p>
            </div>
          </section>

          {/* Availability & Ordering Process */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">3. Availability & Ordering Process</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                <strong>Real‑time stock:</strong> Although inventory status is updated promptly, a painting may occasionally sell off‑line before the website reflects the change. If we receive payment for an Artwork that has already been sold, we will notify you immediately and offer (a) a full refund or (b) the option to select another piece.
              </p>
              <p>
                <strong>Where we ship:</strong> At checkout you must provide a valid shipping address in any of the following countries: Poland, all other EU Member States, Iceland, Norway, Liechtenstein, Switzerland, United Kingdom, United States, Canada, Australia, New Zealand, Japan, Singapore, Hong Kong SAR, South Korea, and United Arab Emirates.
              </p>
              <p>
                We do not ship to countries or territories subject to EU, US, or UN trade sanctions.
              </p>
              <p>
                <strong>Checkout & payment:</strong> All payments are processed securely through Stripe®. Major credit cards and select digital wallets are accepted.
              </p>
              <p>
                <strong>Confirmation:</strong> Stripe sends an automatic receipt. A personal email from Aleksander follows as quickly as possible (usually within a few hours) confirming availability, varnish options (§5) and next steps.
              </p>
            </div>
          </section>

          {/* Pricing, Currency & Taxes */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">4. Pricing, Currency & Taxes</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                Prices are listed in euros (EUR).
              </p>
              <p>
                <strong>Shipping fees are calculated automatically at checkout:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Poland – €10</li>
                <li>European Union, Iceland, Norway, Liechtenstein, Switzerland, United Kingdom – €50</li>
                <li>United States, Canada, Australia, New Zealand – €100</li>
                <li>Japan, Singapore, Hong Kong SAR, South Korea, United Arab Emirates – €100</li>
              </ul>
              <p>
                Import duties, VAT, or other customs fees (if applicable) are the buyer's responsibility and are not collected by this Site.
              </p>
            </div>
          </section>

          {/* Varnish & Dispatch Options */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">5. Varnish & Dispatch Options</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                Oil paint requires curing time before a protective varnish can be applied. Upon purchase you select one of two options:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="border border-border px-4 py-2 text-left">Option</th>
                      <th className="border border-border px-4 py-2 text-left">What happens</th>
                      <th className="border border-border px-4 py-2 text-left">Dispatch timing</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-border px-4 py-2">Immediate Shipment (Unvarnished)</td>
                      <td className="border border-border px-4 py-2">Freshly painted works ship as soon as payment clears, unvarnished. Buyer accepts responsibility for any future varnishing. If the painting has already fully cured and been varnished, it will ship immediately in its finished (varnished) state.</td>
                      <td className="border border-border px-4 py-2">Typically within 1–3 business days of your confirmation email.</td>
                    </tr>
                    <tr>
                      <td className="border border-border px-4 py-2">Varnished Shipment</td>
                      <td className="border border-border px-4 py-2">Freshly painted works remain in the studio until fully cured, then receive a conservation‑grade varnish before shipping. Paintings that have already cured and been varnished will also ship immediately.</td>
                      <td className="border border-border px-4 py-2">Up to 4 months for freshly painted works (exact timing confirmed in your personal email); immediate for already‑cured pieces.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                If you do not state your preference within 7 days of purchase, we will default to Varnished Shipment for archival protection.
              </p>
            </div>
          </section>

          {/* Packaging, Insurance & Tracking */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">6. Shipping Policy — Packaging, Insurance & Tracking</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                Every parcel is packed as carefully as possible using archival materials, double boxing, and corner protection.
              </p>
              <p>
                Shipments are fully insured for the purchase value and require a signature on delivery.
              </p>
              <p>
                A tracking link is emailed the moment the carrier collects the parcel.
              </p>
            </div>
          </section>

          {/* Certificate of Authenticity */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">7. Certificate of Authenticity</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                Each Artwork ships with a hand‑signed Certificate of Authenticity that states title, medium, dimensions, completion date, and bears an embossed studio seal.
              </p>
            </div>
          </section>

          {/* Returns, Damage & Loss */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">8. Refund & Return Policy</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="space-y-4 text-foreground/80 font-light leading-relaxed">
              <p>
                Because each piece is irreplaceable, all sales are final except in cases of transit damage or loss. Orders cannot be cancelled once payment has been captured.
              </p>
              <p>
                <strong>Damage or loss claim</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Inspect the parcel immediately upon arrival and photograph any visible damage.</li>
                <li>Email lukianczukaleksander@gmail.com within 48 hours of delivery, attaching clear photos of the box and Artwork.</li>
                <li>We will initiate a claim with the carrier's insurance. Once compensation is approved, you will receive a refund for the amount paid (including shipping).</li>
              </ul>
              <p>
                <strong>Lost shipment</strong>
              </p>
              <p>
                If tracking shows the parcel lost in transit, we file the insurance claim and refund you once compensation is confirmed.
              </p>
            </div>
          </section>

          {/* Colour Accuracy & Display */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">9. Colour Accuracy & Display</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                Every effort is made to photograph and describe each Artwork faithfully. Because monitors differ, minor colour variations between on‑screen images and the physical painting do not constitute misdescription.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">10. Intellectual Property</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                Reproduction, publication, or distribution of the Artwork or its images for commercial purposes is prohibited without written permission. The artist retains all moral and economic rights under Polish and international copyright law.
              </p>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">11. Limitation of Liability</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                To the fullest extent permitted by law, our total liability for any claim arising out of your purchase will not exceed the purchase price paid for the Artwork. Nothing in these Terms limits statutory consumer rights that cannot be waived.
              </p>
            </div>
          </section>

          {/* Privacy & Communications */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">12. Privacy & Communications</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                Your personal information is used solely to process your order, provide shipping updates, and—if you opt in—send occasional studio news. We never sell or share your data.
              </p>
            </div>
          </section>

          {/* Governing Law & Jurisdiction */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">13. Governing Law & Jurisdiction</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                These Terms are governed by Polish law. Any dispute shall be submitted to the competent courts of Warsaw, without prejudice to mandatory consumer protections that apply in your country of residence.
              </p>
            </div>
          </section>

          {/* Changes to These Terms */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">14. Changes to These Terms</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                We may update these Terms occasionally. The version published at the moment of your purchase applies to that transaction.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-6">
            <h2 className="text-2xl font-serif font-light tracking-tight">15. Contact</h2>
            <div className="elegant-divider mx-0"></div>
            <div className="text-foreground/80 font-light leading-relaxed">
              <p>
                Questions? Email lukianczukaleksander@gmail.com.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase font-light">
            Terms updated 29 June 2025 • Aleksander Lukianczuk
          </p>
        </div>
      </div>
    </div>
  );
}