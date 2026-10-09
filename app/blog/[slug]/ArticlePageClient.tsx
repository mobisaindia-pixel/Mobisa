"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MdxRenderer from "../../components/MdxRenderer";
import ArticleCTA from "../../components/ArticleCTA";
import RelatedArticles from "../../components/RelatedArticles";
import Link from "next/link";
import Image from "next/image";
import type { BlogPost, BlogPostMeta } from "@/lib/blog";

interface ArticlePageClientProps {
  post: BlogPostMeta;
  relatedPosts: BlogPostMeta[];
  children: React.ReactNode;
}

export default function ArticlePageClient({
  post,
  relatedPosts,
  children,
}: ArticlePageClientProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <>
      <Navbar />
      <main className={`article-page layout-${post.layoutMode} width-${post.layoutMode === 'visual' ? 'bleed' : post.layoutMode === 'text' ? 'reading' : 'editorial'}`}>
        <article className="article-container">
          <nav className="article-breadcrumb" aria-label="Breadcrumb">
            <Link href="/blog" className="article-breadcrumb-link">
              ← blog
            </Link>
          </nav>

          <header className="article-header">
            <span className="article-category">{post.category}</span>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-description">{post.description}</p>
            <div className="article-meta">
              <span>
                published {formattedDate} · {post.readingTime} min read
              </span>
            </div>
          </header>

          {post.featuredImage && (
            <div className="article-featured-image-wrap">
              <Image
                src={post.featuredImage}
                alt={post.featuredImageAlt || post.title}
                className="article-featured-image"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          )}

          <div className="article-body">
            {children}
          </div>

          <ArticleCTA />
        </article>

        <div className="article-related-wrap">
          <RelatedArticles posts={relatedPosts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
