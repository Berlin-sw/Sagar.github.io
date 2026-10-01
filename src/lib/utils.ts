import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isExternalUrl(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");
}
