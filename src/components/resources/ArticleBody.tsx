interface ArticleBodyProps {
  html: string;
}

// html is rendered at build time from Markdown in content/resources (trusted, reviewed in PRs).
export default function ArticleBody({ html }: ArticleBodyProps) {
  return <div className="article-body" dangerouslySetInnerHTML={{ __html: html }} />;
}
