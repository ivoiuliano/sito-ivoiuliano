import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";
import { getPostBySlug, getBlogSlugs } from "@/lib/blog";
import { Link } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { baseMetadata } from "@/lib/meta";
import {
  getOrganizationSchema,
  getBreadcrumbSchema,
  getBlogPostingSchema,
} from "@/lib/jsonld";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar } from "lucide-react";
import Image from "next/image";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of getBlogSlugs(locale)) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return {};
  return buildMetadata({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    locale,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "blog" });
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const breadcrumbItems = [
    { name: t("title"), path: "/blog" },
    { name: post.frontmatter.title, path: `/blog/${slug}` },
  ];

  const articleUrl = `${baseMetadata.url}/${locale}/blog/${slug}`;

  return (
    <>
      <JsonLd data={getOrganizationSchema()} />
      <JsonLd data={getBreadcrumbSchema(breadcrumbItems, locale)} />
      <JsonLd
        data={getBlogPostingSchema(
          articleUrl,
          post.frontmatter.title,
          post.frontmatter.description,
          post.frontmatter.date,
          undefined,
          post.frontmatter.image
        )}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          {t("backToList")}
        </Link>

        <header className="mb-8">
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
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.description && (
            <p className="mt-3 text-lg text-muted-foreground">
              {post.frontmatter.description}
            </p>
          )}
        </header>

        {post.frontmatter.image && (
          <div className="relative mb-8 aspect-video w-full overflow-hidden squircle-lg">
            <Image
              src={post.frontmatter.image}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}

        <div
          className={cn(
            "prose prose-neutral dark:prose-invert max-w-none",
            "prose-headings:font-semibold prose-headings:tracking-tight",
            "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
            "prose-img:squircle-lg"
          )}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </>
  );
}
