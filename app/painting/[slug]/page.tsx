import Image from "next/image";
import { client, urlFor } from "../../lib/sanity";
import { Metadata } from 'next';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageCarousel from "@/app/components/ImageCarousel";
import { redirect } from 'next/navigation';

// Interfaces for type safety
interface fullPainting {
  title: string;
  currentSlug: string;
  mainImage: any;
  galleryImages: any[];
  description: string;
  price: number;
  dimensions?: string;
  medium?: string;
  sold?: boolean;
  soldAt?: string;
}

interface simplePaintingCard {
  title: string;
  currentSlug: string;
  mainImage: any;
  price: number;
}

export const revalidate = 30; // Revalidate at most every 30 seconds

// Fetch data for the specific painting and other paintings
async function getData(slug: string) {
    const query = `
    {
      "currentPainting": *[_type == 'painting' && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          mainImage,
          galleryImages,
          description,
          price,
          dimensions,
          medium,
          sold,
          soldAt
      } [0],
      "otherPaintings": *[_type == 'painting' && slug.current != '${slug}' && sold != true] | order(_createdAt desc) [0...3] {
        title,
        "currentSlug": slug.current,
        mainImage,
        price
      }
    }`;
    const data = await client.fetch(query);
    return data;
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { currentPainting }: { currentPainting: fullPainting } = await getData(params.slug);
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

// Add this function to handle the purchase
async function handlePurchase(painting: fullPainting) {
    'use server';
    
    console.log('Painting data being sent to Stripe:', {
        id: painting.currentSlug,
        title: painting.title,
        price: painting.price
    });
    
    const response = await fetch(`${process.env.DOMAIN}/api/stripe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            painting: {
                id: painting.currentSlug, // This should be the slug
                title: painting.title,
                price: painting.price,
                currency: 'USD'
            }
        }),
    });
    
    const { url } = await response.json();
    return url;
}

export default async function PaintingPage({params}: {params: {slug:string}}) {
    const { currentPainting, otherPaintings }: { currentPainting: fullPainting, otherPaintings: simplePaintingCard[] } = await getData(params.slug);
    
    // Combine mainImage and galleryImages for the carousel
    const allImages = [currentPainting.mainImage, ...(currentPainting.galleryImages || [])].filter(Boolean);

    return (
        <div className="mt-8 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Carousel Section */}
                <div className="md:sticky top-24 h-fit">
                    <ImageCarousel images={allImages} />
                </div>

                {/* Painting Details Section */}
                <div className="flex flex-col pt-4">
                    <h1 className="font-serif text-4xl lg:text-5xl font-bold">{currentPainting.title}</h1>
                    <p className="text-2xl mt-4 text-muted-foreground">${currentPainting.price.toLocaleString()}</p>
                    
                    <div className="mt-8 border-t pt-6">
                        <p className="text-lg text-foreground leading-relaxed">{currentPainting.description}</p>
                        
                        <div className="text-sm mt-4 text-muted-foreground space-y-1">
                            {currentPainting.dimensions && (
                                <p>Dimensions: {currentPainting.dimensions}</p>
                            )}
                            {currentPainting.medium && (
                                <p>Medium: {currentPainting.medium}</p>
                            )}
                        </div>
                    </div>

                    {currentPainting.sold ? (
                        <div className="mt-10">
                            <Button size="lg" className="w-full text-lg py-7 font-semibold tracking-wider" disabled>
                                Sold
                            </Button>
                            {currentPainting.soldAt && (
                                <p className="text-center text-xs text-muted-foreground mt-3">
                                    This artwork was sold on {new Date(currentPainting.soldAt).toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="mt-10">
                            <form action={async () => {
                                'use server';
                                const url = await handlePurchase(currentPainting);
                                redirect(url);
                            }}>
                                <Button
                                    size="lg"
                                    className="w-full text-lg py-7 font-semibold tracking-wider transition-transform duration-200 hover:scale-105 bg-black text-white hover:bg-black/90"
                                    type="submit"
                                > Purchase Now
                                </Button>
                            </form>
                        </div>
                    )}
                    <p className="text-center text-xs text-muted-foreground mt-3">Secure checkout via Stripe</p>
                </div>
            </div>

            {/* Other Paintings Section */}
            <div className="mt-24 border-t pt-16">
                <h2 className="text-3xl font-serif text-center mb-12">Other Works</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
                    {otherPaintings.map((painting, idx) => ( 
                        <div key={idx} className="group">
                            <Link href={`/painting/${painting.currentSlug}`}>
                                <div className="overflow-hidden rounded-lg">
                                    <Image  
                                        src={urlFor(painting.mainImage).url()} 
                                        alt={painting.title} 
                                        width={500} 
                                        height={500} 
                                        className="rounded-lg h-auto w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                                    />
                                </div>
                            </Link>
                            <div className="mt-4 text-center">
                                <Link href={`/painting/${painting.currentSlug}`}>
                                    <h3 className="text-xl font-serif">{painting.title}</h3>
                                </Link>
                                <p className="text-md mt-1 text-muted-foreground">${painting.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}