"use client";

import * as React from "react";
import { Cookie, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Define prop types
interface CookieConsentProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "small" | "mini";
    demo?: boolean;
    onAcceptCallback?: () => void;
    onDeclineCallback?: () => void;
    learnMoreHref?: string;
}

const CookieConsent = React.forwardRef<HTMLDivElement, CookieConsentProps>(
    (
        {
            variant = "default",
            demo = false,
            onAcceptCallback = () => { },
            onDeclineCallback = () => { },
            className,
            learnMoreHref = "/pages/cookies",
            ...props
        },
        ref,
    ) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const [hide, setHide] = React.useState(false);
        const [showFloatingButton, setShowFloatingButton] = React.useState(false);
        const t = useTranslations('cookies');

        const handleAccept = React.useCallback(() => {
            setIsOpen(false);
            document.cookie =
                "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            setTimeout(() => {
                setHide(true);
                setShowFloatingButton(true);
            }, 700);
            onAcceptCallback();
        }, [onAcceptCallback]);

        const handleDecline = React.useCallback(() => {
            setIsOpen(false);
            // Set a cookie to remember the decline, so we don't show the banner again immediately
            document.cookie =
                "cookieConsent=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            setTimeout(() => {
                setHide(true);
                setShowFloatingButton(true);
            }, 700);
            onDeclineCallback();
        }, [onDeclineCallback]);

        const handleReopenConsent = React.useCallback(() => {
            setHide(false);
            setShowFloatingButton(false);
            setTimeout(() => {
                setIsOpen(true);
            }, 50);
        }, []);

        React.useEffect(() => {
            try {
                setIsOpen(true);
                // Hide if ANY consent cookie exists (true or false)
                if ((document.cookie.includes("cookieConsent=true") || document.cookie.includes("cookieConsent=false")) && !demo) {
                    setIsOpen(false);
                    setTimeout(() => {
                        setHide(true);
                        setShowFloatingButton(true);
                    }, 700);
                }
            } catch (error) {
                console.warn("Cookie consent error:", error);
            }
        }, [demo]);

        const containerClasses = cn(
            "fixed z-50 transition-all duration-700",
            !isOpen ? "translate-y-full opacity-0" : "translate-y-0 opacity-100",
            className,
        );

        const commonWrapperProps = {
            ref,
            className: cn(
                containerClasses,
                variant === "mini"
                    ? "left-0 right-0 sm:left-4 bottom-4 w-full sm:max-w-3xl"
                    : "bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md",
            ),
            ...props,
        };

        const description = t('description');
        const acceptText = t('accept');
        const declineText = t('decline');
        const titleText = t('title');
        const learnMoreText = t('learnMore');
        const managePreferencesText = t('managePreferences');
        const statusAcceptedText = t('statusAccepted');
        const statusDeclinedText = t('statusDeclined');

        // Floating button to reopen consent dialog
        if (showFloatingButton && hide) {
            // Check current cookie consent status
            const cookiesAccepted = document.cookie.includes("cookieConsent=true");
            const tooltipText = cookiesAccepted ? statusAcceptedText : statusDeclinedText;

            return (
                <div className="fixed bottom-4 left-4 z-50">
                    <Button
                        onClick={handleReopenConsent}
                        size="icon"
                        className={cn(
                            "relative h-12 w-12 shadow-2xl",
                            cookiesAccepted
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground hover:bg-muted/90",
                            "transition-all duration-300 hover:scale-110",
                            "squircle shadow-lg"
                        )}
                        aria-label={tooltipText}
                        title={tooltipText}
                    >
                        <Cookie className="h-5 w-5" />
                        {/* Status indicator badge */}
                        <span
                            className={cn(
                                "absolute -top-1 -right-1 h-4 w-4 squircle-sm flex items-center justify-center",
                                cookiesAccepted
                                    ? "bg-gray-500 text-white"
                                    : "bg-gray-500 text-white"
                            )}
                        >
                            {cookiesAccepted ? (
                                <Check className="h-2 w-2" strokeWidth={2} />
                            ) : (
                                <X className="h-2 w-2" strokeWidth={2} />
                            )}
                        </span>
                    </Button>
                </div>
            );
        }

        if (hide) return null;

        if (variant === "default") {
            return (
                <div {...commonWrapperProps}>
                    <Card className="m-3 shadow-2xl border-primary/20 bg-card/95 backdrop-blur-sm rounded-[1.5rem]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-bold flex items-center gap-2">
                                <Cookie className="h-5 w-5 text-primary" />
                                {titleText}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                                {description}
                            </CardDescription>
                            <div className="text-xs">
                                <a
                                    href={learnMoreHref}
                                    className="text-primary underline underline-offset-4 hover:no-underline font-medium transition-colors"
                                >
                                    {learnMoreText}
                                </a>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-3 pt-2">
                            <Button
                                onClick={handleDecline}
                                variant="outline"
                                className="flex-1 rounded-xl border-white/10 hover:bg-white/5 hover:text-white"
                            >
                                {declineText}
                            </Button>
                            <Button
                                onClick={handleAccept}
                                className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
                            >
                                {acceptText}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            );
        }

        if (variant === "small") {
            return (
                <div {...commonWrapperProps}>
                    <Card className="m-3 shadow-2xl border-primary/20 bg-card/95 backdrop-blur-sm rounded-[1.5rem]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-4 pt-4">
                            <CardTitle className="text-base font-bold flex items-center gap-2">
                                <Cookie className="h-4 w-4 text-primary" />
                                {titleText}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="py-2 px-4">
                            <CardDescription className="text-sm leading-relaxed">
                                {description}
                            </CardDescription>
                        </CardContent>
                        <CardFooter className="flex gap-2 py-3 px-4">
                            <Button
                                onClick={handleDecline}
                                variant="outline"
                                size="sm"
                                className="flex-1 rounded-xl border-white/10 hover:bg-white/5 hover:text-white"
                            >
                                {declineText}
                            </Button>
                            <Button
                                onClick={handleAccept}
                                size="sm"
                                className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
                            >
                                {acceptText}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            );
        }

        if (variant === "mini") {
            return (
                <div {...commonWrapperProps}>
                    <Card className="mx-3 p-0 shadow-2xl border-primary/20 bg-card/95 backdrop-blur-sm rounded-[1rem]">
                        <CardContent className="sm:flex grid gap-4 p-4 items-center">
                            <div className="flex-1 flex gap-3 items-center">
                                <Cookie className="h-5 w-5 text-primary shrink-0" />
                                <CardDescription className="text-xs sm:text-sm leading-relaxed">
                                    {description}
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2 justify-end sm:gap-3 shrink-0">
                                <Button
                                    onClick={handleDecline}
                                    size="sm"
                                    variant="outline"
                                    className="text-xs h-8 rounded-lg border-white/10 hover:bg-white/5 hover:text-white"
                                >
                                    {declineText}
                                </Button>
                                <Button
                                    onClick={handleAccept}
                                    size="sm"
                                    className="text-xs h-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-bold shadow-lg shadow-primary/20"
                                >
                                    {acceptText}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return null;
    },
);

CookieConsent.displayName = "CookieConsent";
export { CookieConsent };
export default CookieConsent;
