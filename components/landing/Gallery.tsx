import { useTranslations } from "next-intl";
import FadeIn from "@/components/FadeIn";
import { BWImageHover } from "@/components/BWImageHover";
import { baseMetadata } from "@/lib/meta";

export function Gallery() {
  const t = useTranslations("gallery");

  // Gallery images - instruments crafted by the luthier
  const images = [
    { src: "/images/gallery/4.webp", alt: `Instrument crafted by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/5.webp", alt: `Violin by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/6.webp", alt: `Viola crafted by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/7.webp", alt: `Instrument detail by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/8.webp", alt: `Cello by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/9.webp", alt: `Workshop - ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/10.webp", alt: `Instrument by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/11.webp", alt: `Baroque instrument by ${baseMetadata.luthier.name}` },
    { src: "/images/gallery/12.webp", alt: `Handcrafted instrument by ${baseMetadata.luthier.name}` },
  ];

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
                className="aspect-square"
              >
                <BWImageHover
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full"
                  priority={index < 6}
                />
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

