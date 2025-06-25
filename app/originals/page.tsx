import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Define an interface for the painting data
interface simplePaintingCard {
  title: string;
  mainImage: any;
  currentSlug: string;
  price: number;
}

export const revalidate = 30; // Revalidate at most every 30 seconds

// Fetch painting data from Sanity
async function getData() {
  const query = `*[_type == 'painting'] | order(_createdAt desc) {
    title,
    "currentSlug": slug.current,
    mainImage,
    price
  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function OriginalsPage() {
  const data: simplePaintingCard[] = await getData();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-8 sm:gap-12 md:gap-16">
      {data.map((painting, idx) => (
        <Card key={idx} className="max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg">
          <Link href={`/painting/${painting.currentSlug}`}>
            <Image
              src={urlFor(painting.mainImage).url()}
              alt={painting.title}
              width={500}
              height={500}
              className="rounded-t h-[300px] w-full object-cover"
            />
          </Link>
          <CardContent className="p-5 text-center">
            <Link href={`/painting/${painting.currentSlug}`} className="text-xl font-semibold line-clamp-2">{painting.title}</Link>
            <p className="text-lg mt-2 text-gray-700 dark:text-gray-300">${painting.price.toLocaleString()}</p>
            <Button asChild className="w-full mt-7">
              <Link href={`/painting/${painting.currentSlug}`}>View Details</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}