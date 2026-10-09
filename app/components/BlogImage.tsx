import React from "react";
import Image from "next/image";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export default function BlogImage({ src, alt, caption, className = "" }: BlogImageProps) {
  return (
    <figure className={`article-figure ${className}`.trim()}>
      <div className="blog-inline-image-wrap">
        <Image
          src={src}
          alt={alt}
          className="article-img"
          width={800}
          height={450}
          sizes="(max-width: 800px) 100vw, 800px"
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
        />
      </div>
      {caption && <figcaption className="article-figcaption">{caption}</figcaption>}
    </figure>
  );
}
