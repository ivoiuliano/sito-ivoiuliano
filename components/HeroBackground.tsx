"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HeroBackgroundProps {
  images: string[];
  interval?: number;
}

/**
 * HeroBackground Component
 * 
 * Rotating background images in B&W for the hero section.
 * Images fade in/out with smooth transitions.
 */
export function HeroBackground({
  images,
  interval = 5000
}: HeroBackgroundProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {images.map((image, index) => (
        <div
          key={image}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            currentIndex === index ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover grayscale"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
}

