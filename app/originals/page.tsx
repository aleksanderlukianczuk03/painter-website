import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

// Define an interface for the painting data
interface simplePaintingCard {
  title: string;
  mainImage: any;
  currentSlug: string;
  price: number;
  dimensions?: string;
  medium?: string;
  sold?: boolean;
}

export const revalidate = 30; // Revalidate at most every 30 seconds

// Fetch painting data from Sanity
async function getData() {
  const query = `*[_type == 'painting'] | order(_createdAt desc) {
    title,
    "currentSlug": slug.current,
    mainImage,
    price,
    dimensions,
    medium,
    sold
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function OriginalsPage() {
  const data: simplePaintingCard[] = await getData();
  const availableCount = data.filter((p) => !p.sold).length;
  const totalCount = data.length;

  return (
    <div className="premium-container py-20">
      {/* Header Section - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left: Collection Title and Info */}
        <div className="text-left space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif font-light tracking-tight leading-none">
              Original Collection
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
              <div className="scarcity-indicator">
                {availableCount} Available of {totalCount}
              </div>
              <div className="text-muted-foreground tracking-[0.1em] uppercase font-light">
                Limited Originals Only
              </div>
            </div>
          </div>

          <div className="elegant-divider mx-0"></div>

          <p className="text-muted-foreground text-sm tracking-[0.1em] uppercase font-light">
            Each work is an original painting. No prints or reproductions.
          </p>
        </div>

        {/* Right: Quote */}
        <div className="text-center lg:text-right">
          <blockquote className="space-y-4">
            <p className="text-xl lg:text-2xl xl:text-3xl font-serif font-light italic text-foreground/85 leading-relaxed">
              &ldquo;There are always flowers for those who want to see them.&rdquo;
            </p>
            <cite className="block not-italic text-sm tracking-[0.15em] uppercase text-muted-foreground font-light">
              — Henri Matisse
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Paintings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
        {data.map((painting, idx) => (
          <div key={idx} className="group relative">
            <Link href={`/painting/${painting.currentSlug}`}>
              <article className="space-y-6">
                {/* Image Container - Full painting display */}
                <div className="relative premium-hover premium-shadow-subtle group-hover:premium-shadow-elevated overflow-hidden">
                  <div className="relative w-full" style={{ aspectRatio: "4/5" }}>
                    <Image
                      src={urlFor(painting.mainImage).url()}
                      alt={painting.title}
                      fill
                      className="object-contain bg-white transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Status Badge */}
                  {painting.sold ? (
                    <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm text-muted-foreground border border-muted-foreground/30 px-3 py-1 text-xs font-medium tracking-wider uppercase">
                      Sold
                    </div>
                  ) : (
                    <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm text-premium-gold border border-premium-gold/30 px-3 py-1 text-xs font-medium tracking-wider uppercase">
                      Available
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/3 transition-colors duration-500"></div>
                </div>

                {/* Painting Details */}
                <div className="text-center space-y-3">
                  <h2 className="text-2xl font-serif font-light tracking-tight text-foreground group-hover:text-premium-gold transition-colors duration-300">
                    {painting.title}
                  </h2>

                  {(painting.dimensions || painting.medium) && (
                    <p className="text-sm text-muted-foreground tracking-[0.1em] uppercase font-light">
                      {painting.dimensions}
                      {painting.dimensions && painting.medium && " • "}
                      {painting.medium}
                    </p>
                  )}

                  <div className="space-y-2">
                    <p className="text-xl font-light tracking-wide">
                      ${painting.price.toLocaleString()}
                    </p>
                    {!painting.sold && (
                      <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase">
                        Original • One of One
                      </p>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}