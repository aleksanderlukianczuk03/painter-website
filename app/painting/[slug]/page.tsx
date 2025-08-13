import Image from "next/image";
import { client, urlFor } from "../../lib/sanity";
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageCarousel from "@/app/components/ImageCarousel";
import { handlePurchase } from "@/app/actions/purchase";

// Interfaces for type safety
interface fullPainting {
  title: string;
  currentSlug: string;
  mainImage: any;
  galleryMedia: any[];
  description: string;
  price: number;
  dimensions?: string;
  medium?: string;
  sold?: boolean;
  soldAt?: string;
}

export const revalidate = 30; // Revalidate at most every 30 seconds

// Fetch data for the specific painting
async function getData(slug: string) {
    const query = `
    *[_type == 'painting' && slug.current == '${slug}'] {
      "currentSlug": slug.current,
        title,
        mainImage,
        galleryMedia,
        description,
        price,
        dimensions,
        medium,
        sold,
        soldAt
    } [0]`;
    const data = await client.fetch(query);
    return data;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const currentPainting: fullPainting = await getData(params.slug);
    if (!currentPainting) {
        return {
            title: "Painting not found",
        };
    }
    return {
        title: currentPainting.title,
        description: currentPainting.description,
        openGraph: {
            title: currentPainting.title,
            description: currentPainting.description,
            images: [
                {
                    url: urlFor(currentPainting.mainImage).url(),
                    alt: currentPainting.title,
                },
            ],
        },
    };
}

export default async function PaintingPage({params}: {params: {slug:string}}) {
    const currentPainting: fullPainting = await getData(params.slug);
    
    // Extract only serializable data for the server action
    const paintingData = {
        currentSlug: currentPainting.currentSlug,
        title: currentPainting.title,
        price: currentPainting.price
    };
    
    // Combine mainImage and galleryMedia for the carousel
    const allImages = [currentPainting.mainImage, ...(currentPainting.galleryMedia || [])].filter(Boolean);

    return (
      <div className="premium-container">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Image Carousel Section */}
          <div className="lg:sticky top-24 h-fit">
            <div className="space-y-6">
              <ImageCarousel images={allImages} />
              {allImages.length > 1 && (
                <p className="text-center text-xs text-muted-foreground tracking-[0.1em] uppercase">
                  {allImages.length} Views Available
                </p>
              )}
            </div>
          </div>

          {/* Painting Details Section */}
          <div className="flex flex-col space-y-12">
            {/* Header */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {currentPainting.sold ? (
                    <div className="scarcity-indicator bg-muted text-muted-foreground border-muted-foreground/30">
                      Sold
                    </div>
                  ) : (
                    <div className="scarcity-indicator">
                      Available Now
                    </div>
                  )}
                </div>
                
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-light tracking-tight leading-tight">
                  {currentPainting.title}
                </h1>
              </div>
              
              <div className="space-y-2">
                <p className="text-3xl lg:text-4xl font-light tracking-wide">
                  €{currentPainting.price ? currentPainting.price.toLocaleString() : 'Price not available'}
                </p>
                <p className="text-sm text-muted-foreground tracking-[0.1em] uppercase font-light">
                  Original Artwork • One of One
                </p>
              </div>
            </div>

            <div className="elegant-divider"></div>
            
            {/* Description */}
            <div className="space-y-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg font-light leading-relaxed text-foreground/90">
                  {currentPainting.description}
                </p>
              </div>
              
              {/* Specifications */}
              <div className="grid grid-cols-2 gap-6 text-sm">
                {currentPainting.dimensions && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground tracking-[0.1em] uppercase font-light">Dimensions</p>
                    <p className="font-light">{currentPainting.dimensions}</p>
                  </div>
                )}
                {currentPainting.medium && (
                  <div className="space-y-1">
                    <p className="text-muted-foreground tracking-[0.1em] uppercase font-light">Medium</p>
                    <p className="font-light">{currentPainting.medium}</p>
                  </div>
                )}
              </div>
            </div>
 
            {/* Purchase Section */}
            <div className="space-y-6 pt-8">
              {currentPainting.sold ? (
                <div className="space-y-4">
                  <Button size="lg" className="w-full btn-premium h-14 text-base whitespace-nowrap" disabled>
                    Sold to Private Collector
                  </Button>
                  {currentPainting.soldAt && (
                    <p className="text-center text-xs text-muted-foreground tracking-[0.1em] uppercase">
                      Acquired {new Date(currentPainting.soldAt).toLocaleDateString('en-US', { 
                          month: 'long', 
                          year: 'numeric' 
                      })}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <form action={handlePurchase.bind(null, paintingData)}>
                    <Button
                      size="lg"
                      className="w-full btn-premium h-14 text-base"
                      type="submit"
                    > 
                      Acquire Original
                    </Button>
                  </form>
                  <div className="text-center space-y-2">
                    <p className="text-xs text-muted-foreground tracking-[0.1em] uppercase">
                      Secure Checkout • Worldwide Shipping
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Certificate of Authenticity Included
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}