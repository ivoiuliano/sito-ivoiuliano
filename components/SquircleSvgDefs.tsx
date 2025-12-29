/**
 * SquircleSvgDefs Component
 * 
 * Provides SVG definitions for squircle clip-paths that can be referenced
 * throughout the application. Include this once in your root layout.
 * 
 * Usage:
 * ```tsx
 * import SquircleSvgDefs from '@/components/SquircleSvgDefs';
 * 
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         <SquircleSvgDefs />
 *         {children}
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */

export default function SquircleSvgDefs() {
    return (
        <svg
            id="squircle-defs"
            xmlns="http://www.w3.org/2000/svg"
            style={{
                position: "absolute",
                width: 0,
                height: 0,
                overflow: "hidden",
            }}
            aria-hidden="true"
        >
            <defs>
                {/* Small squircle */}
                <clipPath id="squircle-sm" clipPathUnits="objectBoundingBox">
                    <path d="M 0.1,0 C 0.05,0 0,0.05 0,0.1 L 0,0.9 C 0,0.95 0.05,1 0.1,1 L 0.9,1 C 0.95,1 1,0.95 1,0.9 L 1,0.1 C 1,0.05 0.95,0 0.9,0 Z" />
                </clipPath>

                {/* Medium squircle (default) */}
                <clipPath id="squircle" clipPathUnits="objectBoundingBox">
                    <path d="M 0.15,0 C 0.067,0 0,0.067 0,0.15 L 0,0.85 C 0,0.933 0.067,1 0.15,1 L 0.85,1 C 0.933,1 1,0.933 1,0.85 L 1,0.15 C 1,0.067 0.933,0 0.85,0 Z" />
                </clipPath>

                {/* Large squircle */}
                <clipPath id="squircle-lg" clipPathUnits="objectBoundingBox">
                    <path d="M 0.2,0 C 0.09,0 0,0.09 0,0.2 L 0,0.8 C 0,0.91 0.09,1 0.2,1 L 0.8,1 C 0.91,1 1,0.91 1,0.8 L 1,0.2 C 1,0.09 0.91,0 0.8,0 Z" />
                </clipPath>

                {/* Extra large squircle */}
                <clipPath id="squircle-xl" clipPathUnits="objectBoundingBox">
                    <path d="M 0.25,0 C 0.112,0 0,0.112 0,0.25 L 0,0.75 C 0,0.888 0.112,1 0.25,1 L 0.75,1 C 0.888,1 1,0.888 1,0.75 L 1,0.25 C 1,0.112 0.888,0 0.75,0 Z" />
                </clipPath>
            </defs>
        </svg>
    );
}

