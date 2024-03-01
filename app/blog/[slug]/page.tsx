import Image from "next/image";
import {client} from "../../lib/sanity";
import {fullBlog} from "../../lib/interface";
import {urlFor} from "../../lib/sanity";
import { PortableText } from "@portabletext/react";
import Link from 'next/link';
import { Metadata } from 'next';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { simpleBlogCard } from "../../lib/interface";

export const revalidate = 30;

async function getData(slug: string) {
    const query = `
    {
      "currentArticle": *[_type == 'blog' && slug.current == '${slug}'] {
        "currentSlug": slug.current,
          title,
          content,
          titleimage,
          smallDescription,
      } [0],
      "allArticles": *[_type == 'blog'] | order(_createdAt desc) {
        title,
        smallDescription,
        "currentSlug": slug.current,
        titleimage,
      }
    }`;
    const data = await client.fetch(query);
    return data;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { currentArticle }: { currentArticle: fullBlog } = await getData(params.slug);
    return {
        title: currentArticle.title,
        description: currentArticle.smallDescription,
        openGraph: {
            title: currentArticle.title,
            images: [
                {
                    url: urlFor(currentArticle.titleimage).url(), // Set the URL of the image
                    alt: currentArticle.title, // Set the alt text of the image
                },
            ],
        },
    };
}

export default async function BlogArticle({params}: {params: {slug: string}}) {
    const { currentArticle, allArticles }: { currentArticle: fullBlog, allArticles: simpleBlogCard[] } = await getData(params.slug);
  
    const otherArticles = allArticles.filter(article => article.currentSlug !== currentArticle.currentSlug);
    return (
        <div className="mt-8">
            <div className="mt-16 prose prose-blue prose-lg dark:prose-invert">
                <h1 className="text-left">
                    <span className="mt-2 block text-3xl leading-8 font-bold tracking-tight sm:text-4xl">
                        {currentArticle.title}
                    </span>
                </h1>
                <div className="w-full">
                    <Image
                        src={urlFor(currentArticle.titleimage).url()}
                        alt={currentArticle.title}
                        width={400}
                        height={400}
                        priority
                        className="rounded-t-lg mt-8 border w-full"
                    />
                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300">{currentArticle.smallDescription}</p>
            </div>

            <div className="mt-16 prose prose-lg dark:prose-invert">
                <PortableText value={currentArticle.content} />
                <Link href="/author" className="ml-3">Alex Luk</Link>
            </div>

            <div className="mt-16">
                <h2 className="text-md">Other Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
                    {otherArticles.map((post, idx) => ( 
                        <Card key={idx} className="max-w-sm mx-auto">
                            <div className="w-full">
                                <Image  src={urlFor(post.titleimage).url()} alt="image" width={500} height={500} className="rounded-t-lg h-[200px] object-cover w-full" />
                            </div>
                            <CardContent className="mt-5">
                                <a href={`/blog/${post.currentSlug}`} className="text-lg line-clamp-2 font-bold">{post.title}</a>
                                <a href={`/blog/${post.currentSlug}`} className="line-clamp-3 text-sm mt-2 ">{post.smallDescription}</a>
                                <Button asChild className="w-full mt-7 flex items-center justify-center bg-green-600 text-white">
                                    <a href={`/blog/${post.currentSlug}`} className="py-2 text-center">Read More</a>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
