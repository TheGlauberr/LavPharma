"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { animate, inView } from "motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  as?: ElementType;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const OFFSET_PX = 16;

/**
 * Subtle scroll-in reveal. Content is rendered fully visible on the server and
 * only hidden by JS right before it is animated, so it stays readable when JS
 * fails, when reduced motion is requested, and for anything already on screen.
 */
export default function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.style.opacity = "0";
    el.style.transform = `translateY(${OFFSET_PX}px)`;
    const stop = inView(
      el,
      () => {
        animate(
          el,
          { opacity: 1, transform: "translateY(0px)" },
          { duration: 0.7, delay, ease: EASE_OUT_EXPO },
        );
      },
      { margin: "0px 0px -8% 0px" },
    );
    return () => {
      stop();
      el.style.opacity = "";
      el.style.transform = "";
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
