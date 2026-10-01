"use client";

import { m } from "framer-motion";
import { GitBranch } from "lucide-react";

import { EASE_OUT } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type TokenKind = "keyword" | "property" | "string" | "punct" | "plain";
type Line = [TokenKind, string][];

const tokenClass: Record<TokenKind, string> = {
  keyword: "text-[var(--code-keyword)]",
  property: "text-[var(--code-property)]",
  string: "text-[var(--code-string)]",
  punct: "text-[var(--code-punct)]",
  plain: "text-fg",
};

const codeLines: Line[] = [
  [["keyword", "const "], ["plain", "sagar"], ["punct", " = {"]],
  [["property", "  role"], ["punct", ": "], ["string", '"CSE Student"'], ["punct", ","]],
  [["property", "  focus"], ["punct", ": ["], ["string", '"Software"'], ["punct", ", "], ["string", '"AI/ML"'], ["punct", "],"]],
  [["property", "  stack"], ["punct", ": ["], ["string", '"TS"'], ["punct", ", "], ["string", '"Python"'], ["punct", ", "], ["string", '"Next.js"'], ["punct", "],"]],
  [["property", "  building"], ["punct", ": "], ["string", '"DevLens AI"'], ["punct", ","]],
  [["property", "  learning"], ["punct", ": "], ["string", '"System Design"'], ["punct", ","]],
  [["punct", "};"]],
  [],
  [["keyword", "export default "], ["plain", "sagar"], ["punct", ";"]],
];

const terminalLines = [
  { prefix: "$", text: "devlens analyze ./repo", tone: "text-fg" },
  { prefix: "✓", text: "repository cloned", tone: "text-success" },
  { prefix: "✓", text: "syntax trees parsed", tone: "text-success" },
  { prefix: "✓", text: "AI review complete", tone: "text-success" },
  { prefix: "→", text: "report ready", tone: "text-accent" },
];

const CODE_START = 0.45;
const TERMINAL_START = CODE_START + codeLines.length * 0.07 + 0.35;

export function HeroVisual() {
  return (
    <div
      role="img"
      aria-label="Illustration: a code editor describing Sagar's focus areas and a terminal running a DevLens AI analysis"
      className="relative mx-auto w-full max-w-lg lg:max-w-none"
    >
      <div
        aria-hidden="true"
        className="absolute -inset-8 -z-10 opacity-80"
        style={{ background: "radial-gradient(60% 55% at 55% 40%, var(--glow-1), transparent 70%)" }}
      />

      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE_OUT }}
        className="overflow-hidden rounded-2xl border border-border-strong bg-bg-elevated/75 shadow-[0_24px_80px_-24px_rgb(0_0_0/0.5)] backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-3 flex items-center gap-1 font-mono text-[11px]">
            <span className="rounded-md bg-surface-hover px-2.5 py-1 text-fg">sagar.ts</span>
            <span className="hidden px-2.5 py-1 text-fg-subtle sm:inline">devlens.config.ts</span>
          </div>
        </div>

        <pre className="overflow-hidden px-3 py-5 font-mono text-[11.5px] leading-6 sm:px-4 sm:text-[13px]">
          <code>
            {codeLines.map((line, index) => (
              <m.span
                key={index}
                className="flex"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: CODE_START + index * 0.07, duration: 0.35, ease: EASE_OUT }}
              >
                <span className="w-7 shrink-0 select-none pr-3 text-right text-fg-subtle/60 sm:w-8 sm:pr-4">
                  {index + 1}
                </span>
                <span className="whitespace-pre">
                  {line.map(([kind, text], tokenIndex) => (
                    <span key={tokenIndex} className={tokenClass[kind]}>
                      {text}
                    </span>
                  ))}
                </span>
              </m.span>
            ))}
          </code>
        </pre>

        <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[11px] text-fg-subtle">
          <span className="flex items-center gap-1.5">
            <GitBranch className="size-3" aria-hidden="true" />
            main
          </span>
          <span>TypeScript · UTF-8</span>
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: TERMINAL_START - 0.25, ease: EASE_OUT }}
        className={cn(
          "relative z-10 -mt-8 ml-auto w-[88%] max-w-[22rem] overflow-hidden rounded-xl border border-border-strong bg-bg/90 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.55)] backdrop-blur-xl",
          "sm:absolute sm:-bottom-20 sm:-right-4 sm:mt-0 sm:w-[17rem] lg:-right-6",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-3.5 py-2">
          <span className="font-mono text-[11px] text-fg-subtle">terminal</span>
          <span className="size-1.5 rounded-full bg-success" />
        </div>
        <div className="space-y-1 px-3.5 py-3 font-mono text-[11.5px] leading-5 sm:text-xs">
          {terminalLines.map((line, index) => (
            <m.p
              key={line.text}
              className="flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: TERMINAL_START + index * 0.35, duration: 0.25 }}
            >
              <span className={cn("w-3 shrink-0", line.tone)}>{line.prefix}</span>
              <span className={index === 0 ? "text-fg" : "text-fg-muted"}>{line.text}</span>
            </m.p>
          ))}
          <m.p
            className="flex gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: TERMINAL_START + terminalLines.length * 0.35, duration: 0.2 }}
          >
            <span className="w-3 shrink-0 text-fg">$</span>
            <span className="inline-block h-4 w-2 translate-y-0.5 animate-blink bg-fg/80" />
          </m.p>
        </div>
      </m.div>
    </div>
  );
}
