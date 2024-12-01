import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: (string | undefined)[]) => {
  return twMerge(clsx(inputs));
};

export { cn };
