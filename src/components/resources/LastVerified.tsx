import { getTranslations } from "next-intl/server";
import { formatDate } from "@/lib/resources/content";

interface LastVerifiedProps {
  date: string;
  locale: string;
}

/** Small box stating when the article's facts were last checked against official sources. */
export default async function LastVerified({ date, locale }: LastVerifiedProps) {
  const t = await getTranslations("Resources");
  return (
    <div className="rounded-xl border border-line bg-surface p-[18px]">
      <p className="eyebrow">{t("lastVerified")}</p>
      <p className="mt-2 flex items-center gap-2 text-[15px] font-medium">
        <span aria-hidden="true" className="h-2 w-2 flex-none rounded-full bg-ok shadow-[0_0_0_3px_rgba(46,158,106,0.18)]" />
        <time dateTime={date}>{formatDate(date, locale)}</time>
      </p>
    </div>
  );
}
