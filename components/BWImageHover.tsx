"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BWImageHoverProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * Image component that starts in B&W and transitions to color with zoom on hover
 */
export function BWImageHover({
  src,
  alt,
  width = 600,
  height = 600,
  className,
  priority = false,
}: BWImageHoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "w-full h-full object-cover transition-all duration-700 ease-out",
          isHovered ? "scale-110 grayscale-0" : "scale-100 grayscale"
        )}
        priority={priority}
      />
    </div>
  );
}

