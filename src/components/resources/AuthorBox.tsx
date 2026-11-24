import { getTranslations } from "next-intl/server";
import { findAuthor, hasPublicFile } from "@/lib/resources/authors";

interface AuthorBoxProps {
  reviewedBy?: string;
}

function Avatar({ initials, photo, name }: { initials: string; photo?: string; name: string }) {
  if (photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={name}
        width={64}
        height={64}
        className="h-16 w-16 rounded-full bg-slate-100 object-cover object-top flex-shrink-0"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="h-16 w-16 flex-shrink-0 rounded-full bg-navy-darker text-white font-display text-xl flex items-center justify-center tracking-wide"
    >
      {initials}
    </span>
  );
}

/**
 * Shows Laura's card only when she actually reviewed the article (reviewedBy set).
 * Otherwise the article is credited to the regulatory team.
 */
export default async function AuthorBox({ reviewedBy }: AuthorBoxProps) {
  const t = await getTranslations("Resources");
  const author = findAuthor(reviewedBy);
  const photo = author && hasPublicFile(author.photo) ? author.photo : undefined;

  return (
    <section
      aria-labelledby="author-heading"
      className="mt-16 rounded-2xl border border-card-border bg-card-bg/60 p-6 sm:p-8"
    >
      <h2
        id="author-heading"
        className="text-[11px] tracking-[0.18em] uppercase font-semibold text-accent-deep mb-5"
      >
        {t("authorTitle")}
      </h2>
      <div className="flex items-start gap-5">
        {author ? (
          <Avatar initials={author.initials} photo={photo} name={author.name} />
        ) : (
          <Avatar initials="LP" name={t("byline")} />
        )}
        <div className="min-w-0">
          {author ? (
            <>
              <p className="font-display text-navy-darker text-xl font-medium">{author.name}</p>
              <p className="text-muted text-sm mb-3">{t("authorRole")}</p>
              <p className="text-navy text-[15px] font-medium mb-2">
                {t("bylineReviewed", { name: author.name })}
              </p>
            </>
          ) : (
            <p className="font-display text-navy-darker text-xl font-medium mb-2">{t("byline")}</p>
          )}
          <p className="text-muted text-[15px] leading-relaxed">{t("authorBody")}</p>
          {author?.linkedin ? (
            <a
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-accent-deep text-sm font-semibold hover:underline underline-offset-4"
            >
              {t("authorLinkedin")}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
