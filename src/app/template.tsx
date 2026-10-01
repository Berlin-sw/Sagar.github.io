"use client";

import { m } from "framer-motion";
import { useEffect, type ReactNode } from "react";

import { EASE_OUT } from "@/components/ui/reveal";

// The first page load renders without a transition so content is visible
// before hydration; later client-side navigations fade in.
let hasNavigated = false;

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    hasNavigated = true;
  }, []);

  return (
    <m.div
      initial={hasNavigated ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      {children}
    </m.div>
  );
}
