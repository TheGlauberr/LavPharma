interface GroupHeadingProps {
  title: string;
  count: number;
}

export const padNumber = (n: number): string => String(n).padStart(2, "0");

/** Group title with a mono item count on the right, above a ruled list. */
export default function GroupHeading({ title, count }: GroupHeadingProps) {
  return (
    <div className="flex items-baseline justify-between gap-4 pb-3.5">
      <h3 className="text-[20px] font-semibold tracking-[-0.02em]">{title}</h3>
      <span className="eyebrow">{padNumber(count)}</span>
    </div>
  );
}
