import { MetadataRoute } from "next";
import { client } from "././lib/sanity";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all slugs
    const query = `*[_type == 'blog']{ "slug": slug.current }`;
    const posts = await client.fetch(query);

    // Map slugs to sitemap entries
    const postsSitemap = posts.map((post: { slug: string }) => ({
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    }));

    // Combine all sitemap entries
    const sitemap = [
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/author`,
        },
        ...postsSitemap
    ];

    return sitemap;
}