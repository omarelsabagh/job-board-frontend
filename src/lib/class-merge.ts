import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Merge Tailwind classes and prevent duplication (e.g., both px-2 and px-4)
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
