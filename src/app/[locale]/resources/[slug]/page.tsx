import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import ArticleBody from "@/components/resources/ArticleBody";
import ArticleCta from "@/components/resources/ArticleCta";
import ArticleHeader from "@/components/resources/ArticleHeader";
import ArticleJsonLd from "@/components/resources/ArticleJsonLd";
import AuthorBox from "@/components/resources/AuthorBox";
import FaqList from "@/components/resources/FaqList";
import RelatedResources from "@/components/resources/RelatedResources";
import SourcesList from "@/components/resources/SourcesList";
import { getResource, getResourceParams, resourcePath } from "@/lib/resources/content";
import { resourcesMetadata } from "@/lib/resources/metadata";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getResourceParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getResource(slug, locale);
  return resourcesMetadata({
    locale,
    path: resourcePath(slug),
    title: `${article.title} | LAV PHARMA`,
    description: article.description,
    type: "article",
    publishedTime: article.published,
    modifiedTime: article.updated,
  });
}

export default async function ResourceArticle({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Resources");
  const tNav = await getTranslations("Nav");
  const article = getResource(slug, locale);

  return (
    <main>
      <ArticleJsonLd
        article={article}
        homeLabel={t("breadcrumbHome")}
        sectionLabel={tNav("resources")}
      />
      <ArticleHeader article={article} />
      <div className="bg-white pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <ArticleBody html={article.html} />
          <FaqList items={article.faq} />
          <SourcesList sources={article.sources} locale={locale} />
          <p className="mt-10 border-l-2 border-card-border pl-4 text-[14px] leading-relaxed text-muted">
            {t("disclaimer")}
          </p>
          <AuthorBox reviewedBy={article.reviewedBy} />
          <ArticleCta country={article.countries.length === 1 ? article.countries[0] : undefined} />
          <RelatedResources slugs={article.related} locale={locale} />
        </div>
      </div>
      <Footer />
    </main>
  );
}
