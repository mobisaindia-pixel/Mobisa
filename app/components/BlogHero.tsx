"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function BlogHero() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="blog-hero" ref={ref}>
      <div className="blog-hero-inner">
        <motion.span
          className="blog-hero-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          mobisa / blog
        </motion.span>

        <motion.h1
          className="blog-hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ideas that make ads{" "}
          <em>work.</em>
        </motion.h1>

        <motion.p
          className="blog-hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          AI advertising, UGC, product visuals, creative strategy and the things we&apos;re learning while building for modern brands.
        </motion.p>
      </div>
    </section>
  );
}
