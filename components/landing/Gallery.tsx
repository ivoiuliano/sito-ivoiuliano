"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { BWImageHover } from "@/components/BWImageHover";
import { baseMetadata } from "@/lib/meta";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import Image from "next/image";

export function Gallery() {
  const t = useTranslations("gallery");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Gallery images - instruments crafted by the luthier
  const images = [
    { src: "/images/gallery/4.webp", alt: `Instrument crafted by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/5.webp", alt: `Violin by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/6.webp", alt: `Viola crafted by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/7.webp", alt: `Instrument detail by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/8.webp", alt: `Cello by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/9.webp", alt: `Workshop - ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/10.webp", alt: `Instrument by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/11.webp", alt: `Baroque instrument by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/12.webp", alt: `Handcrafted instrument by ${baseMetadata.luthier.name}` },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-20 sm:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <BWImageHover
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full"
                  priority={index < 6}
                />
                <button
                  className="absolute bottom-4 right-4 p-2 bg-black/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(index);
                  }}
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-md transition-colors z-10"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          {/* Image */}
          <div className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-8 relative">
            <Image
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              fill
              className="object-contain"
              quality={100}
            />
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
