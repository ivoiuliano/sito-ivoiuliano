"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { BWImageHover } from "@/components/BWImageHover";
import { baseMetadata } from "@/lib/meta";
import { useState, useEffect, useCallback } from "react";
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
    { src: "/images/gallery/6b.webp", alt: `Viola crafted by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/7.webp", alt: `Instrument detail by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/8b.webp", alt: `Cello by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/9.webp", alt: `Workshop - ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/10.webp", alt: `Instrument by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/11.webp", alt: `Baroque instrument by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/12.webp", alt: `Handcrafted instrument by ${baseMetadata.luthier.name}` },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent body scroll when lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen, closeLightbox, goToPrevious, goToNext]);

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
                className="aspect-square relative group cursor-pointer overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <BWImageHover
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full"
                  priority={index < 6}
                />
                {/* Overlay gradient for better icon visibility */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Fullscreen icon button */}
                <button
                  className="absolute bottom-3 right-3 p-2.5 bg-black/80 backdrop-blur-sm text-white squircle shadow-xl opacity-80 hover:opacity-100 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10 border border-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(index);
                  }}
                  aria-label="View fullscreen"
                >
                  <Maximize2 className="h-5 w-5" strokeWidth={2.5} />
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
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 squircle transition-colors z-20"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>

          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:bg-white/10 squircle transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white hover:bg-white/10 squircle transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8 sm:h-10 sm:w-10" />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex items-center justify-center px-16 sm:px-20 py-16 z-10">
            <div className="relative w-full h-full">
              <Image
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                fill
                className="object-contain"
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              />
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-medium bg-black/50 px-4 py-2 squircle z-20">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
}
