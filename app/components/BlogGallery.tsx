import React from "react";
import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface BlogGalleryProps {
  images: GalleryImage[];
}

export default function BlogGallery({ images }: BlogGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="blog-gallery">
      {images.map((img, i) => (
        <div key={i} className="blog-gallery-item">
          <Image
            src={img.src}
            alt={img.alt}
            className="article-img"
            width={600}
            height={400}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </div>
  );
}
