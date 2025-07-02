import Image from "next/image";
import { client, urlFor } from "./lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CatchyText from "./components/catchy-description";

export default function Home() {
  return (
    <main className="premium-container py-16 md:py-20">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        {/* Left side: Image and Title */}
        <figure className="w-full lg:w-1/2 flex-shrink-0 flex flex-col items-center">
          <div className="hero-image premium-shadow-elevated bg-background p-8 inline-block">
            <div className="relative">
              <Image
                src="/IMG_20250629_122835.jpg"
                alt="Deepest Love - Original Oil Painting"
                width={400}
                height={500}
                className="object-contain"
                priority
              />
            </div>
          </div>
          <figcaption className="mt-8 text-center space-y-3 w-full max-w-[400px]">
            <h1 className="text-3xl lg:text-4xl font-serif font-light tracking-tight text-foreground">
              Deepest Love
            </h1>
            <p className="text-muted-foreground tracking-[0.1em] uppercase text-sm font-light">
              Oil on Linen • 16&rdquo; × 20&rdquo;
            </p>
            <div className="scarcity-indicator mx-auto">
              Original • One of One
            </div>
          </figcaption>
        </figure>

        {/* Right side: Quote and Philosophy */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-12">
          <blockquote className="space-y-6">
            <p className="text-3xl lg:text-4xl font-serif font-light italic text-foreground/90 leading-relaxed">
              &ldquo;Art must be an expression of love or it is nothing.&rdquo;
            </p>
            <cite className="block not-italic text-sm tracking-[0.15em] uppercase text-muted-foreground font-light">
              — Marc Chagall
            </cite>
          </blockquote>

          <div className="elegant-divider"></div>

          <div className="space-y-6 text-muted-foreground">
            <p className="text-lg font-light leading-relaxed">
              Each painting in this collection represents months of dedicated work,
              capturing the ephemeral beauty of flowers in their most intimate
              moments.
            </p>
            <p className="text-base font-light leading-relaxed">
              Limited to original pieces only. Once sold, these works become part
              of private collections worldwide.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}