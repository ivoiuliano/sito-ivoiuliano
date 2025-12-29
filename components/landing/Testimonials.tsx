"use client";

import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

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
            <div className="flex gap-6">
              {testimonialKeys.map((key, index) => {
                const isExpanded = expandedIndex === index;
                const quote = t(`items.${key}.quote`);
                const shouldTruncate = quote.length > 200;

                return (
                  <div
                    key={key}
                    className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_38%] min-w-0"
                  >
                    <div className="rounded-lg bg-card p-6 shadow-sm border border-border/50 h-full flex flex-col hover:shadow-md transition-shadow">
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
                      <div className="border-t border-border pt-4">
                        <p className="font-semibold text-foreground text-sm">
                          {t(`items.${key}.author`)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {t(`items.${key}.role`)}
                        </p>
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
              className="rounded-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="rounded-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
