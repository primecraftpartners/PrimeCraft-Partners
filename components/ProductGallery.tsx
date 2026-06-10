"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!activeImage) {
    return (
      <div className="flex aspect-[4/5] items-center justify-center rounded-md border border-ink/10 bg-white text-sm font-bold text-ink/45">
        Image available on request
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-ink/10 bg-white shadow-sm">
        <Image
          src={activeImage}
          alt={productName}
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-contain p-3"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveImage(image)}
              className={`relative aspect-square overflow-hidden rounded-md border bg-white transition ${
                activeImage === image ? "border-leather ring-2 ring-brass/40" : "border-ink/10 hover:border-leather"
              }`}
              aria-label={`View ${productName} image ${index + 1}`}
            >
              <Image src={image} alt={`${productName} thumbnail ${index + 1}`} fill sizes="20vw" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
