"use client";

import React from "react";
import { motion } from "framer-motion";

interface BlogFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function BlogFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: BlogFiltersProps) {
  const all = [...categories];

  return (
    <div className="blog-filters">
      <div className="blog-filters-inner">
        {all.map((cat) => {
          const isActive =
            cat === activeCategory ||
            (cat === "All" && activeCategory === "All");
          return (
            <motion.button
              key={cat}
              className={`blog-filter-btn${isActive ? " blog-filter-active" : ""}`}
              onClick={() => onCategoryChange(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
