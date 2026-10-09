import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type LayoutMode = "visual" | "mixed" | "text";
export type ArticleRecipe = "playbook" | "comparison" | "workflow" | "examples" | "guide" | "strategy" | "analysis";
export type VisualStyle = "editorial-product" | "creator-ugc" | "infographic" | "campaign" | "diagrammatic" | "lifestyle" | "performance-ad";

export interface BlogPostMeta {
  title: string;
  slug: string;
  description: string;
  category: string;
  primaryKeyword: string;
  searchIntent: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  draft: boolean;
  featured: boolean;
  featuredImage: string;
  featuredImageAlt: string;
  relatedSlugs: string[];
  imageBriefs: string[];
  readingTime: number;
  layoutMode: LayoutMode;
  recipe: ArticleRecipe;
  visualDensity: 1 | 2 | 3 | 4 | 5;
  visualStyle: VisualStyle;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");
export const POSTS_PER_PAGE = 12;

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const noOfWords = text.split(/\s/g).length;
  const minutes = noOfWords / wordsPerMinute;
  return Math.max(1, Math.ceil(minutes));
}

function getMdxFiles(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

import articleVisuals from "./article-visuals.json";

function parsePost(filename: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const isDraft = Boolean(data.draft);
  if (isDraft && process.env.NODE_ENV === "production") {
    return null; // hide drafts in production
  }

  const readingTime = calculateReadingTime(content);
  const slug = data.slug ?? filename.replace(/\.mdx?$/, "");
  const visualData = (articleVisuals as any)[slug];
  
  const featuredImage = visualData?.cover?.src || data.coverImage || "";
  const featuredImageAlt = visualData?.cover?.alt || data.coverAlt || "";

  return {
    title: data.title ?? "",
    slug,
    description: data.description ?? "",
    category: data.category ?? "",
    primaryKeyword: data.primaryKeyword ?? "",
    searchIntent: data.searchIntent ?? "",
    author: data.author ?? "Mobisa",
    publishedAt: data.recommendedPublishDate || data.publishedAt || "",
    draft: isDraft,
    featured: Boolean(data.featured),
    featuredImage,
    featuredImageAlt,
    relatedSlugs: data.relatedSlugs ?? [],
    imageBriefs: data.imageBriefs ?? [],
    readingTime,
    layoutMode: data.layoutMode ?? "mixed",
    recipe: data.recipe ?? "guide",
    visualDensity: data.visualDensity ?? 3,
    visualStyle: data.visualStyle ?? "editorial-product",
    content,
  };
}

export function getAllPosts(): BlogPost[] {
  return getMdxFiles()
    .map(parsePost)
    .filter((p): p is BlogPost => p !== null)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getAllPostsMeta(): BlogPostMeta[] {
  return getAllPosts().map(({ content: _, ...meta }) => meta);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getPostsPage(
  page: number,
  category?: string
): { posts: BlogPostMeta[]; totalPages: number; currentPage: number } {
  let all = getAllPostsMeta();

  if (category && category !== "all" && category !== "All") {
    all = all.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  const totalPages = Math.max(1, Math.ceil(all.length / POSTS_PER_PAGE));
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const posts = all.slice(start, start + POSTS_PER_PAGE);

  return { posts, totalPages, currentPage: safePage };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const current = getPostBySlug(slug);
  if (!current) return [];

  const all = getAllPostsMeta();
  let result: BlogPostMeta[] = [];

  // 1. Try to use explicit relatedSlugs
  if (current.relatedSlugs && current.relatedSlugs.length > 0) {
    result = all.filter((p) => current.relatedSlugs.includes(p.slug));
  }

  // 2. Fallback to same category if not enough relatedSlugs found
  if (result.length < limit) {
    const usedSlugs = new Set([slug, ...result.map((p) => p.slug)]);
    const sameCategory = all.filter(
      (p) =>
        !usedSlugs.has(p.slug) &&
        p.category.toLowerCase() === current.category.toLowerCase()
    );
    result.push(...sameCategory.slice(0, limit - result.length));
  }

  // 3. Absolute fallback
  if (result.length < limit) {
    const finalUsed = new Set([slug, ...result.map((p) => p.slug)]);
    const filler = all
      .filter((p) => !finalUsed.has(p.slug))
      .slice(0, limit - result.length);
    result.push(...filler);
  }

  return result.slice(0, limit);
}

export function getFeaturedPost(): BlogPostMeta | null {
  const all = getAllPostsMeta();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}

export function getActiveCategories(): string[] {
  const cats = new Set(getAllPostsMeta().map((p) => p.category));
  return Array.from(cats);
}

export function getAllSlugs(): string[] {
  return getAllPostsMeta().map((p) => p.slug);
}
