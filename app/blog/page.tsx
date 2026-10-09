import type { Metadata } from "next";
import { getPostsPage, getActiveCategories, getAllPostsMeta, getFeaturedPost } from "@/lib/blog";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Mobisa Blog — AI Ads, UGC & D2C Creative",
  description:
    "Ideas, strategies and practical insights on AI advertising, UGC ads, product visuals, Meta creatives and D2C creative from Mobisa.",
  alternates: {
    canonical: "https://www.mobisa.in/blog",
  },
  openGraph: {
    title: "Mobisa Blog — AI Ads, UGC & D2C Creative",
    description:
      "Ideas, strategies and practical insights on AI advertising, UGC ads, product visuals, Meta creatives and D2C creative from Mobisa.",
    url: "https://www.mobisa.in/blog",
    siteName: "Mobisa",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobisa Blog — AI Ads, UGC & D2C Creative",
    description:
      "Ideas, strategies and practical insights on AI advertising, UGC ads, product visuals, Meta creatives and D2C creative from Mobisa.",
  },
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10) || 1);
  const category = params.category ?? "All";
  const { posts, totalPages, currentPage } = getPostsPage(page, category);
  
  const allCategories = getActiveCategories();
  const categories = ["All", ...allCategories.filter(c => c !== "All")];
  
  const featuredPost = getFeaturedPost();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Mobisa Journal",
    description:
      "Ideas, strategies and practical insights on AI advertising, UGC ads, product visuals, Meta creatives and D2C creative from Mobisa.",
    url: "https://www.mobisa.in/blog",
    publisher: {
      "@type": "Organization",
      name: "Mobisa",
      url: "https://www.mobisa.in",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogPageClient
        posts={posts}
        categories={categories}
        initialPage={currentPage}
        initialCategory={category}
        totalPages={totalPages}
        featuredPost={featuredPost}
      />
    </>
  );
}
