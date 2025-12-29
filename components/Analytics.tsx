"use client";

import { useState, useEffect } from "react";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@next/third-parties/google";
import MetaPixel from "@/components/pixels/MetaPixel";

export default function Analytics() {
    const [consent, setConsent] = useState<boolean>(false);

    useEffect(() => {
        // Check if consent cookie exists
        const hasConsent = document.cookie.includes("cookieConsent=true");
        if (hasConsent) {
            // Wrap in timeout to avoid synchronous state update warning
            setTimeout(() => {
                setConsent(true);
            }, 0);
        }
    }, []);

    const handleAccept = () => {
        setConsent(true);
    };

    const handleDecline = () => {
        setConsent(false);
    };

    return (
        <>
            <CookieConsent
                variant="default"
                onAcceptCallback={handleAccept}
                onDeclineCallback={handleDecline}
            />

            {consent && (
                <>
                    {/* Google Analytics */}
                    {process.env.NEXT_PUBLIC_GA_ID && (
                        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                    )}

                    {/* Meta Pixel */}
                    {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
                        <MetaPixel id={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
                    )}
                </>
            )}
        </>
    );
}
