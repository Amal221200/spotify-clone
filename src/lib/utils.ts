import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDuration(sec: number) {
  const formatter = new Intl.DateTimeFormat('en-US', { minute: '2-digit', second: '2-digit' });
  return formatter.formatToParts(sec)
}