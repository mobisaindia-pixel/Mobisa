"use client";

import React from "react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  category?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  category,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", String(page));
    if (category && category !== "all" && category !== "All") params.set("category", category);
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages: number[] = [];
  for (let p = 1; p <= totalPages; p++) {
    pages.push(p);
  }

  return (
    <nav className="blog-pagination" aria-label="Blog pagination">
      {currentPage > 1 && (
        <Link
          href={buildHref(currentPage - 1)}
          className="blog-pagination-btn blog-pagination-prev"
          aria-label="Previous page"
        >
          ←
        </Link>
      )}

      <div className="blog-pagination-pages">
        {pages.map((p) => (
          <Link
            key={p}
            href={buildHref(p)}
            className={`blog-pagination-page${p === currentPage ? " blog-pagination-active" : ""}`}
            aria-current={p === currentPage ? "page" : undefined}
          >
            {p}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          href={buildHref(currentPage + 1)}
          className="blog-pagination-btn blog-pagination-next"
          aria-label="Next page"
        >
          →
        </Link>
      )}
    </nav>
  );
}
