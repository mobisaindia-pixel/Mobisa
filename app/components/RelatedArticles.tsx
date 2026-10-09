"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/blog";

interface RelatedArticlesProps {
  posts: BlogPostMeta[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  if (posts.length === 0) return null;

  return (
    <section className="related-articles" ref={ref}>
      <motion.h2
        className="related-title"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        keep reading.
      </motion.h2>

      <div className="related-grid">
        {posts.map((post, i) => {
          const formattedDate = new Date(post.publishedAt).toLocaleDateString(
            "en-GB",
            { day: "numeric", month: "short", year: "numeric" }
          );
          return (
            <motion.article
              key={post.slug}
              className="related-card"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="related-card-link">
                {post.featuredImage ? (
                  <>
                    <div className="related-card-image-wrap">
                      <Image
                        src={post.featuredImage}
                        alt={post.featuredImageAlt || post.title}
                        className="related-card-image"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <div className="related-card-content">
                      <span className="related-card-category">
                        {post.category}
                      </span>
                      <h3 className="related-card-title">{post.title}</h3>
                      <span className="related-card-meta">
                        {formattedDate} · {post.readingTime} min read
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="related-card-fallback" style={{ background: '#f5f5f0', padding: '40px 30px', height: '100%', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="related-card-category" style={{ marginBottom: '16px' }}>
                      {post.category}
                    </span>
                    <h3 className="related-card-title" style={{ fontSize: '1.6rem', marginBottom: '24px' }}>{post.title}</h3>
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--blue)' }}>read article →</span>
                  </div>
                )}
              </Link>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
