import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import JsonLd from "@/components/JsonLd";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/jsonld";
import { cn } from "@/lib/utils";
import { Calendar } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    locale,
    path: "/blog",
  });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const posts = getAllPosts(locale);

  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getWebSiteSchema()} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-muted-foreground">{t("description")}</p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">{t("noPosts")}</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <article
                  className={cn(
                    "squircle-lg squircle-interactive block border border-border/50 bg-card p-6 transition-colors hover:border-primary/30"
                  )}
                >
                  <Link href={`/blog/${post.slug}`} className="group">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" aria-hidden />
                      <time dateTime={post.frontmatter.date}>
                        {new Date(post.frontmatter.date).toLocaleDateString(
                          locale === "it" ? "it-IT" : "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </time>
                    </div>
                    <h2 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary">
                      {post.frontmatter.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground line-clamp-2">
                      {post.frontmatter.description}
                    </p>
                    <span className="mt-3 inline-block text-sm font-medium text-primary">
                      {t("readMore")} →
                    </span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
