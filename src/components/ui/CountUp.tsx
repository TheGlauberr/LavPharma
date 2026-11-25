"use client";

import { useEffect, useRef } from "react";
import { animate, inView } from "motion";

interface CountUpProps {
  to: number;
  suffix?: string;
  delay?: number;
}

/**
 * Counts from 0 to `to` the first time it scrolls into view. The server renders
 * the final number, so it is correct without JS and for reduced motion.
 */
export default function CountUp({ to, suffix = "", delay = 0 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const render = (value: number) => {
      el.textContent = `${Math.round(value)}${suffix}`;
    };
    render(0);
    let controls: ReturnType<typeof animate> | undefined;
    const stop = inView(el, () => {
      controls = animate(0, to, { duration: 1.6, delay, ease: [0.16, 1, 0.3, 1], onUpdate: render });
    });
    return () => {
      stop();
      controls?.stop();
      render(to);
    };
  }, [to, suffix, delay]);

  return (
    <span ref={ref}>
      {to}
      {suffix}
    </span>
  );
}
