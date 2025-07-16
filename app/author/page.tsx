import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About the Artist"
};

export default function AuthorPage() {
  return (
    <div className="premium-container py-20">
      <div className="max-w-5xl mx-auto">
        {/* Header Section - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left: Page Title and Info */}
          <div></div>

          {/* Right: Empty or could add another quote/element later */}
          <div></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Artist Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-80 h-80 premium-shadow-elevated bg-background p-6">
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src="/me.jpg" 
                  alt="Photo of the artist, Alex Luk"
                  fill
                  className="object-cover"
                />
              </div>
            </div> 
          </div>

          {/* Artist Bio */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-serif font-light tracking-tight">
                Aleksander Łukiańczuk
              </h2>
              <p className="text-sm text-muted-foreground tracking-[0.1em] uppercase font-light">
                No Taboo Paintings
              </p>
            </div>
            
            <div className="elegant-divider lg:mx-0"></div>
            
            <div className="space-y-6 text-foreground/80">
              <p className="text-base font-light leading-relaxed">
                Aleksander Łukiańczuk is a 21-year-old contemporary painter specializing in floral compositions that embrace a painterly style close to realism. His work captures the delicate balance between elegance and intimacy, offering collectors unique pieces that enhance sophisticated interiors.
              </p>
              <p className="text-base font-light leading-relaxed">
He honed his artistic skills through teachings by renowned American painter Elizabeth Robbins.              </p>
              <p className="text-base font-light leading-relaxed">
                Beyond painting, Aleksander is known internationally for his popular art channels, No Taboo Paintings, which have captivated over 200,000 fans on YouTube and Instagram and garnered more than 100 million views with emotionally charged explorations of provocative art.
              </p>
              <p className="text-base font-light leading-relaxed">
                Aleksander&apos;s creativity extends to literature—he has published two poetry collections. His multifaceted background also includes a degree in Finance & Accounting from the prestigious SGH Warsaw School of Economics and entrepreneurial experience founding an AI-driven health startup.
              </p>
              <p className="text-base font-light leading-relaxed">
                Based in Warsaw, Aleksander invites collectors worldwide to experience the exclusivity and quiet elegance of his paintings.
              </p>
            </div>
            
            <div className="pt-4">
              <div className="scarcity-indicator inline-flex">
                Based in Warsaw • 200K+ Followers • Contemporary Painter
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
