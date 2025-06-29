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
                  src="/me.png" 
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
                Alex Luk
              </h2>
              <p className="text-sm text-muted-foreground tracking-[0.1em] uppercase font-light">
                Contemporary Realist Painter
              </p>
            </div>
            
            <div className="elegant-divider lg:mx-0"></div>
            
            <div className="space-y-6 text-foreground/80">
              <p className="text-lg font-light leading-relaxed">
                I find inspiration in the quiet moments of everyday life—the way light falls on a vase of flowers, the rich textures of velvet, and the timeless beauty of the natural world. My work is a celebration of these simple, profound moments, captured with oil on linen.
              </p>
              <p className="text-base font-light leading-relaxed">
                With a background in classical painting techniques, I aim to create art that feels both timeless and contemporary, bringing a sense of peace and elegance to the spaces it inhabits. Thank you for joining me on this journey.
              </p>
            </div>
            
            <div className="pt-4">
              <div className="scarcity-indicator inline-flex">
                Based in Studio • Creating Since 2020
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
