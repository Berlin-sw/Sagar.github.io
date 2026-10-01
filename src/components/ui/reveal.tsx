"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_OUT = [0.21, 0.47, 0.32, 0.98] as const;

const elements = {
  div: m.div,
  li: m.li,
  article: m.article,
} as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof elements;
};

/** Fades and lifts its children in once they scroll into view. */
export function Reveal({ children, className, delay = 0, as = "div" }: RevealProps) {
  const Component = elements[as];

  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -64px 0px" }}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
}
