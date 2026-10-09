import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllSlugs,
} from "@/lib/blog";
import ArticlePageClient from "./ArticlePageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Mobisa`,
    description: post.description,
    alternates: {
      canonical: `https://www.mobisa.in/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://www.mobisa.in/blog/${post.slug}`,
      siteName: "Mobisa",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      images: post.featuredImage
        ? [
            {
              url: `https://www.mobisa.in${post.featuredImage}`,
              alt: post.featuredImageAlt,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.featuredImage
        ? [`https://www.mobisa.in${post.featuredImage}`]
        : [],
    },
  };
}

import { MDXRemote } from "next-mdx-remote/rsc";
import BlogImage from "../../components/BlogImage";
import BlogGallery from "../../components/BlogGallery";
import PullQuote from "../../components/PullQuote";
import ChecklistBlock from "../../components/ChecklistBlock";
import ComparisonTable from "../../components/ComparisonTable";
import FrameworkFlow from "../../components/FrameworkFlow";

const mdxComponents = {
  BlogImage,
  BlogGallery,
  PullQuote,
  ChecklistBlock,
  ComparisonTable,
  FrameworkFlow,
};

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(slug, 3);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.featuredImage
      ? `https://www.mobisa.in${post.featuredImage}`
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://www.mobisa.in",
    },
    publisher: {
      "@type": "Organization",
      name: "Mobisa",
      url: "https://www.mobisa.in",
      logo: {
        "@type": "ImageObject",
        url: "https://www.mobisa.in/Mobisa-Logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.mobisa.in/blog/${post.slug}`,
    },
  };

  const { content, ...meta } = post;
  let finalContent = content;
  
  try {
    const articleVisuals = require("@/lib/article-visuals.json");
    const visualData = articleVisuals[slug];
    if (visualData && visualData.sections && visualData.sections.length > 0) {
      for (const img of visualData.sections) {
        if (img.afterHeading) {
          const escapedHeading = img.afterHeading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`^(#{2,6}\\s+${escapedHeading})(?:\\s|$)`, 'm');
          const replacement = `$1\n\n<BlogImage src="${img.src}" alt="${img.alt}" />\n\n`;
          if (regex.test(finalContent)) {
            finalContent = finalContent.replace(regex, replacement);
          } else {
            finalContent += `\n\n<BlogImage src="${img.src}" alt="${img.alt}" />\n\n`;
          }
        } else {
          finalContent += `\n\n<BlogImage src="${img.src}" alt="${img.alt}" />\n\n`;
        }
      }
    }
  } catch(e) {
    console.error(e);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ArticlePageClient post={meta} relatedPosts={relatedPosts}>
        <MDXRemote source={finalContent} components={mdxComponents} />
      </ArticlePageClient>
    </>
  );
}
