import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Squircle Utilities
 *
 * Helper functions for generating squircle shapes (smooth continuous rounded rectangles)
 * using CSS clip-path and SVG paths.
 */

/**
 * Generates an SVG path for a squircle shape
 * @param width - Width of the squircle
 * @param height - Height of the squircle
 * @param cornerRadius - Radius of the corners
 * @param cornerSmoothing - Smoothing factor (0-1, where 1 is maximum smoothing)
 * @returns SVG path string
 */
export function generateSquirclePath(
  width: number,
  height: number,
  cornerRadius: number,
  cornerSmoothing: number = 1
): string {
  // Clamp values
  cornerRadius = Math.min(cornerRadius, Math.min(width, height) / 2);
  cornerSmoothing = Math.max(0, Math.min(1, cornerSmoothing));

  // Calculate control points for smooth bezier curves
  const smoothing = cornerSmoothing * 0.6; // Scale factor for optimal curve
  const cpOffset = cornerRadius * smoothing;

  // Define the 8 key points (4 corners x 2 control points each)
  const path = `
    M ${cornerRadius},0
    L ${width - cornerRadius},0
    C ${width - cornerRadius + cpOffset},0 ${width},${
    cornerRadius - cpOffset
  } ${width},${cornerRadius}
    L ${width},${height - cornerRadius}
    C ${width},${height - cornerRadius + cpOffset} ${
    width - cornerRadius + cpOffset
  },${height} ${width - cornerRadius},${height}
    L ${cornerRadius},${height}
    C ${cornerRadius - cpOffset},${height} 0,${
    height - cornerRadius + cpOffset
  } 0,${height - cornerRadius}
    L 0,${cornerRadius}
    C 0,${cornerRadius - cpOffset} ${
    cornerRadius - cpOffset
  },0 ${cornerRadius},0
    Z
  `
    .trim()
    .replace(/\s+/g, " ");

  return path;
}

/**
 * Generates inline style object for squircle clip-path
 * @param width - Width in pixels
 * @param height - Height in pixels
 * @param cornerRadius - Corner radius in pixels
 * @param cornerSmoothing - Smoothing factor (0-1)
 * @returns React style object
 */
export function getSquircleStyle(
  width: number,
  height: number,
  cornerRadius: number,
  cornerSmoothing: number = 1
) {
  const path = generateSquirclePath(
    width,
    height,
    cornerRadius,
    cornerSmoothing
  );
  return {
    clipPath: `path('${path}')`,
    WebkitClipPath: `path('${path}')`,
  };
}

/**
 * Generate CSS custom properties for squircle
 * Useful for dynamic squircle generation
 */
export function getSquircleVars(cornerRadius: number, smoothing: number = 1) {
  return {
    "--squircle-radius": `${cornerRadius}px`,
    "--squircle-smoothing": smoothing,
  } as React.CSSProperties;
}
