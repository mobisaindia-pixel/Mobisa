"use client";

import React from "react";
import BlogCard from "./BlogCard";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogGridProps {
  posts: BlogPostMeta[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="blog-empty">
        <p className="blog-empty-text">no articles in this category yet.</p>
      </div>
    );
  }

  return (
    <div className="blog-grid">
      {posts.map((post, i) => (
        <BlogCard key={post.slug} post={post} index={i} />
      ))}
    </div>
  );
}
