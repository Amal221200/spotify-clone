import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDuration(sec: number) {
  const minutes = Math.floor(sec / 60).toString()
  const rem = Math.floor(sec % 60).toString()

  return `${minutes.length >= 2 ? minutes : `0${minutes}`}:${rem.length >= 2 ? rem : `0${rem}`}`
}