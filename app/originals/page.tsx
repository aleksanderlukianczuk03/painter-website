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
    medium
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function OriginalsPage() {
  const data: simplePaintingCard[] = await getData();

  return (
    <div>
      <h1 className="text-center text-4xl font-serif mb-16">Original Paintings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {data.map((painting, idx) => (
          <div key={idx} className="group text-center">
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
              <h2 className="text-xl font-serif mt-4">{painting.title}</h2>
              {(painting.dimensions || painting.medium) && (
                <p className="text-sm mt-1 text-muted-foreground">
                  {painting.dimensions}
                  {painting.dimensions && painting.medium && ' • '}
                  {painting.medium}
                </p>
              )}
              <p className="text-lg mt-2">${painting.price.toLocaleString()}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}