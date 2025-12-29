"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    fullWidth?: boolean;
    viewportTrigger?: boolean;
}

export default function FadeIn({
    children,
    className,
    delay = 0,
    direction = "up",
    fullWidth = false,
    viewportTrigger = false // Changed default to false to prevent scroll-triggered hiding/showing
}: FadeInProps) {

    const variants: Variants = {
        hidden: {
            opacity: 0,
            y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
            x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration: 0.6,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98] as const
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate={!viewportTrigger ? "visible" : undefined}
            whileInView={viewportTrigger ? "visible" : undefined}
            viewport={viewportTrigger ? { once: true, margin: "-20px" } : undefined}
            variants={variants}
            className={className}
            style={{ width: fullWidth ? "100%" : "auto" }}
        >
            {children}
        </motion.div>
    );
}
