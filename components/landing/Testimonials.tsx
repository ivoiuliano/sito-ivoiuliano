"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  // Map testimonial keys to their corresponding photos
  const getAvatarPath = (key: string): string => {
    const avatarMap: Record<string, string> = {
      gothoni: "/images/persone/Mark_Gothoni.png",
      furusawa: "/images/persone/Kaori_Furusawa.png",
      rohde: "/images/persone/Hartmund_Rhode.png",
      konishi: "/images/persone/Mao_Konishi.png",
      todicescu: "/images/persone/Alex_todicescu.png",
      pasquier: "/images/persone/Cyrill_Pasquier.png",
      rome: "/images/persone/Maja_rome.png",
    };
    return avatarMap[key] || "/images/persone/default.png";
  };

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const testimonialKeys = [
    "gothoni",
    "furusawa",
    "rohde",
    "konishi",
    "todicescu",
    "pasquier",
    "rome",
  ];

  return (
    <section id="testimonials" className="py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <FadeIn>
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              {t("title")}
            </h2>
            <p className="text-lg text-muted-foreground">{t("subtitle")}</p>
          </div>
        </FadeIn>

        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 -ml-6">
              {testimonialKeys.map((key, index) => {
                const isExpanded = expandedIndex === index;
                const quote = t(`items.${key}.quote`);
                const shouldTruncate = quote.length > 200;

                const authorName = t(`items.${key}.author`);
                
                return (
                  <div
                    key={key}
                    className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_38%] min-w-0 pl-6"
                  >
                    <div className="squircle-lg bg-card p-6 shadow-sm border border-border/50 h-full flex flex-col hover:shadow-md transition-shadow">
                      <Quote className="h-8 w-8 text-primary/30 mb-4" />
                      <blockquote className="flex-grow mb-6">
                        <p
                          className={cn(
                            "text-sm text-muted-foreground italic leading-relaxed",
                            !isExpanded && shouldTruncate && "line-clamp-6"
                          )}
                        >
                          &ldquo;{quote}&rdquo;
                        </p>
                        {shouldTruncate && (
                          <button
                            onClick={() =>
                              setExpandedIndex(isExpanded ? null : index)
                            }
                            className="text-primary text-xs mt-2 hover:underline"
                          >
                            {isExpanded ? t("showLess") : t("readMore")}
                          </button>
                        )}
                      </blockquote>
                      <div className="border-t border-border pt-4 flex items-center gap-3">
                        <div className="relative w-12 h-12 squircle-img flex-shrink-0 overflow-hidden bg-muted">
                          <Image
                            src={getAvatarPath(key)}
                            alt={authorName}
                            fill
                            className="object-cover"
                            sizes="48px"
                            unoptimized
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">
                            {authorName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {t(`items.${key}.role`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="squircle"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="squircle"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
