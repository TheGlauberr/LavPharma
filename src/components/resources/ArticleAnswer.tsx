import { getTranslations } from "next-intl/server";

interface ArticleAnswerProps {
  answer: string;
}

/** The short direct answer that opens every article, on a light brand tint. */
export default async function ArticleAnswer({ answer }: ArticleAnswerProps) {
  const t = await getTranslations("Resources");
  return (
    <aside
      aria-label={t("answerLabel")}
      className="rounded-[4px_14px_14px_4px] border border-l-[3px] border-line border-l-accent-deep bg-tint px-[22px] py-[22px] lg:px-8 lg:py-7"
    >
      <p className="eyebrow">{t("answerLabel")}</p>
      <p className="mt-2.5 text-[17px] leading-[1.6] tracking-[-0.01em] lg:text-[19px]">{answer}</p>
    </aside>
  );
}
