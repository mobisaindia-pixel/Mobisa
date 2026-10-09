import React from "react";

interface PullQuoteProps {
  quote: string;
  author?: string;
}

export default function PullQuote({ quote, author }: PullQuoteProps) {
  return (
    <blockquote className="article-pull-quote">
      <p>&quot;{quote}&quot;</p>
      {author && <cite>— {author}</cite>}
    </blockquote>
  );
}
