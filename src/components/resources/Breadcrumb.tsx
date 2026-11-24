import { Link } from "@/i18n/navigation";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-[13px] text-muted">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2 min-w-0">
            {i > 0 ? <span aria-hidden="true" className="text-card-border">/</span> : null}
            {item.href ? (
              <Link href={item.href} className="hover:text-accent-deep transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-navy truncate max-w-[16rem] sm:max-w-none">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
