import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import ArticleAnswer from "@/components/resources/ArticleAnswer";
import ArticleBody from "@/components/resources/ArticleBody";
import ArticleCta from "@/components/resources/ArticleCta";
import ArticleHeader from "@/components/resources/ArticleHeader";
import ArticleJsonLd from "@/components/resources/ArticleJsonLd";
import ArticleToc from "@/components/resources/ArticleToc";
import AuthorBox from "@/components/resources/AuthorBox";
import FaqList from "@/components/resources/FaqList";
import LastVerified from "@/components/resources/LastVerified";
import RelatedResources from "@/components/resources/RelatedResources";
import SourcesList from "@/components/resources/SourcesList";
import { getResource, getResourceParams, resourcePath } from "@/lib/resources/content";
import { resourcesMetadata } from "@/lib/resources/metadata";
import { extractHeadings } from "@/lib/resources/toc";

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
  const toc = [
    ...extractHeadings(article.html),
    { id: "faq-heading", text: t("faqTitle") },
    { id: "sources-heading", text: t("sourcesTitle") },
  ];

  return (
    <main>
      <ArticleJsonLd article={article} homeLabel={t("breadcrumbHome")} sectionLabel={tNav("resources")} />
      <article>
        <div className="surface-band border-b border-line">
          <div className="wrap pt-8 pb-10 lg:pt-14 lg:pb-14">
            <div className="max-w-[760px]">
              <ArticleHeader article={article} />
            </div>
          </div>
        </div>
        <div className="wrap grid grid-cols-1 gap-12 pt-8 pb-[72px] lg:grid-cols-[minmax(0,760px)_260px] lg:justify-between lg:gap-16 lg:pt-12 lg:pb-[120px] xl:grid-cols-[minmax(0,760px)_280px] xl:gap-24">
          <div className="min-w-0">
            <ArticleAnswer answer={article.answer} />
            <ArticleBody html={article.html} />
            <FaqList items={article.faq} />
            <SourcesList sources={article.sources} locale={locale} />
            <p className="mt-10 border-l-2 border-line pl-4 text-[14px] leading-relaxed text-mut">{t("disclaimer")}</p>
            <AuthorBox reviewedBy={article.reviewedBy} />
            <ArticleCta country={article.countries.length === 1 ? article.countries[0] : undefined} />
            <RelatedResources slugs={article.related} locale={locale} />
          </div>
          <aside className="hidden rounded-2xl bg-band p-5 lg:sticky lg:top-[104px] lg:grid lg:gap-7 lg:self-start">
            <LastVerified date={article.lastVerified} locale={locale} />
            <ArticleToc label={t("onThisPage")} entries={toc} />
          </aside>
        </div>
      </article>
      <Footer />
    </main>
  );
}
