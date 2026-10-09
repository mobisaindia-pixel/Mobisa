"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <motion.article
      ref={ref}
      className="blog-card"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/blog/${post.slug}`} className="blog-card-link">
        {post.featuredImage ? (
          <div className="blog-card-image-wrap">
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt || post.title}
              className="blog-card-image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : (
          <div className="blog-card-image-wrap blog-card-image-placeholder">
            <span>mobisa editorial</span>
          </div>
        )}

        <div className="blog-card-content">
          <span className="blog-card-category">{post.category}</span>

          <h2 className="blog-card-title">{post.title}</h2>

          <p className="blog-card-excerpt">{post.description}</p>

          <div className="blog-card-meta">
            <span>
              {formattedDate} · {post.readingTime} min read
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
