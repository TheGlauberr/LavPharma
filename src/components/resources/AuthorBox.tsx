import { getTranslations } from "next-intl/server";
import { findAuthor, hasPublicFile } from "@/lib/resources/authors";

interface AuthorBoxProps {
  reviewedBy?: string;
}

const AVATAR = "h-[72px] w-[72px] flex-none rounded-[14px] bg-soft sm:h-24 sm:w-24";

function Avatar({ initials, photo, name }: { initials: string; photo?: string; name: string }) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photo} alt={name} width={96} height={96} className={`${AVATAR} object-cover object-top`} />
    );
  }
  return (
    <span aria-hidden="true" className={`${AVATAR} grid place-items-center bg-ink text-xl font-semibold tracking-wide text-on-ink`}>
      {initials}
    </span>
  );
}

/**
 * Shows the reviewer card only when someone actually reviewed the article (reviewedBy set).
 * Otherwise the article is credited to the regulatory team.
 */
export default async function AuthorBox({ reviewedBy }: AuthorBoxProps) {
  const t = await getTranslations("Resources");
  const author = findAuthor(reviewedBy);
  const photo = author && hasPublicFile(author.photo) ? author.photo : undefined;

  return (
    <section
      aria-labelledby="author-heading"
      className="mt-[72px] grid grid-cols-[72px_minmax(0,1fr)] gap-4 rounded-2xl border border-line p-5 sm:grid-cols-[96px_minmax(0,1fr)] sm:gap-6 sm:p-7"
    >
      {author ? (
        <Avatar initials={author.initials} photo={photo} name={author.name} />
      ) : (
        <Avatar initials="LP" name={t("byline")} />
      )}
      <div className="min-w-0">
        <h2 id="author-heading" className="eyebrow">
          {t("authorTitle")}
        </h2>
        {author ? (
          <>
            <p className="mt-2 text-[21px] font-semibold tracking-[-0.02em]">{author.name}</p>
            <p className="mb-3 text-[14.5px] text-mut">{t("authorRole")}</p>
            <p className="mb-1.5 text-[15px] font-medium">{t("bylineReviewed", { name: author.name })}</p>
          </>
        ) : (
          <p className="mt-2 mb-2 text-[21px] font-semibold tracking-[-0.02em]">{t("byline")}</p>
        )}
        <p className="text-[15px] leading-relaxed text-mut">{t("authorBody")}</p>
        {author?.linkedin ? (
          <a
            href={author.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-[14.5px] font-medium text-accent-deep underline-offset-4 hover:underline"
          >
            {t("authorLinkedin")}
          </a>
        ) : null}
      </div>
    </section>
  );
}
