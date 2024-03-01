import Image from "next/image";
import Navbar from "./components/navbar";
import { client, urlFor } from "./lib/sanity";
import { simpleBlogCard } from "./lib/interface";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import CatchyText from "./components/catchy-description";
import { Metadata } from 'next';

export const revalidate = 30;

async function getData() {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
    title,
    smallDescription,
    "currentSlug": slug.current,
    titleimage,
  }`;

  const data = await client.fetch(query);

  return data;
}

<CatchyText />

export default async function Home() {
  const data: simpleBlogCard[] = await getData();
  
  return (
    <div>
      <CatchyText />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-8 sm:gap-12 md:gap-16">
      {data.map((post, idx) => ( 
  <Card key={idx} className="max-w-sm mx-auto">
    <a href={`/blog/${post.currentSlug}`}>
    <Image src={urlFor(post.titleimage).url()} alt="image" width={500} height={500} className="rounded-t h-[200px] object-cover" />
    </a>
    <CardContent className="mt-5">
      <a href={`/blog/${post.currentSlug}`} className="text-lg line-clamp-2 font-bold">{post.title}</a>
      <a href={`/blog/${post.currentSlug}`} className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">{post.smallDescription}</a>
      <Button asChild className={`w-full mt-7 flex justify-center ${post.title.toLowerCase().includes('Recipe') ? 'bg-green-600' : 'bg-green-600'} text-white`} style={{ alignItems: 'center' }}>
        <a href={`/blog/${post.currentSlug}`} className="py-2 text-center">{post.title.toLowerCase().includes('Recipe') ? 'See Recipe' : 'Read More'}</a>
      </Button>
    </CardContent>
  </Card>
))}
      </div>
    </div>
  );
}
