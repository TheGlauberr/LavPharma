import { findAuthor } from "@/lib/resources/authors";
import { resourcePath, type Resource } from "@/lib/resources/content";
import { ORGANIZATION_ID, SITE_NAME, localizedUrl } from "@/lib/site";

interface ArticleJsonLdProps {
  article: Resource;
  homeLabel: string;
  sectionLabel: string;
}

function authorNode(reviewedBy: string | undefined) {
  const author = findAuthor(reviewedBy);
  if (!author) return { "@id": ORGANIZATION_ID };
  return {
    "@type": "Person",
    name: author.name,
    ...(author.linkedin ? { sameAs: [author.linkedin] } : {}),
    worksFor: { "@id": ORGANIZATION_ID },
  };
}

export default function ArticleJsonLd({ article, homeLabel, sectionLabel }: ArticleJsonLdProps) {
  const url = localizedUrl(article.locale, resourcePath(article.slug));
  const graph = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.description,
      inLanguage: article.locale,
      datePublished: article.published,
      dateModified: article.updated,
      mainEntityOfPage: url,
      image: `${url}/opengraph-image`,
      author: authorNode(article.reviewedBy),
      publisher: { "@id": ORGANIZATION_ID, name: SITE_NAME },
      about: article.countries.map((name) => ({ "@type": "Country", name })),
      citation: article.sources.map((s) => ({
        "@type": "CreativeWork",
        name: s.title,
        url: s.url,
        publisher: s.publisher,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: homeLabel, item: localizedUrl(article.locale) },
        {
          "@type": "ListItem",
          position: 2,
          name: sectionLabel,
          item: localizedUrl(article.locale, resourcePath()),
        },
        { "@type": "ListItem", position: 3, name: article.title, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ];

  // Escape "<" so article text can never close the script tag.
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
    /</g,
    "\\u003c",
  );
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
