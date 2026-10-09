"use client";

import React, { useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogHero from "../components/BlogHero";
import BlogFilters from "../components/BlogFilters";
import BlogGrid from "../components/BlogGrid";
import Pagination from "../components/Pagination";
import type { BlogPostMeta } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BlogPageClientProps {
  posts: BlogPostMeta[];
  categories: string[];
  initialPage: number;
  initialCategory: string;
  totalPages: number;
  featuredPost: BlogPostMeta | null;
}

export default function BlogPageClient({
  posts,
  categories,
  initialPage,
  initialCategory,
  totalPages,
  featuredPost,
}: BlogPageClientProps) {
  const router = useRouter();
  
  const handleCategoryChange = (cat: string) => {
    if (cat === "All" || cat === "all") {
      router.push("/blog");
    } else {
      router.push(`/blog?category=${encodeURIComponent(cat)}`);
    }
  };

  return (
    <>
      <Navbar />
      <main className="blog-page">
        <BlogHero />

        <div className="blog-listing-container">
          {initialPage === 1 && initialCategory === "All" && featuredPost && (
            <section className="blog-featured">
              <Link href={`/blog/${featuredPost.slug}`} className="blog-featured-link">
                <div className="blog-featured-image-wrap">
                  {featuredPost.featuredImage ? (
                    <Image
                      src={featuredPost.featuredImage}
                      alt={featuredPost.featuredImageAlt || featuredPost.title}
                      fill
                      style={{ objectFit: "cover" }}
                      priority
                      className="blog-featured-image"
                    />
                  ) : (
                    <div className="blog-featured-image-placeholder">
                      <span>mobisa editorial</span>
                    </div>
                  )}
                </div>
                <div className="blog-featured-content">
                  <span className="blog-featured-category">{featuredPost.category}</span>
                  <h2 className="blog-featured-title">{featuredPost.title}</h2>
                  <p className="blog-featured-description">{featuredPost.description}</p>
                  <div className="blog-featured-meta">
                    <span>
                      {new Date(featuredPost.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric"
                      })} · {featuredPost.readingTime} min read
                    </span>
                    <span className="blog-featured-read">read article →</span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          <BlogFilters
            categories={categories}
            activeCategory={initialCategory}
            onCategoryChange={handleCategoryChange}
          />

          <BlogGrid posts={posts} />

          <Pagination
            currentPage={initialPage}
            totalPages={totalPages}
            basePath="/blog"
            category={initialCategory !== "All" && initialCategory !== "all" ? initialCategory : undefined}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
