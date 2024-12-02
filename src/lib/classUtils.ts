import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: (string | undefined | false)[]) => {
  return twMerge(clsx(inputs));
};

export { cn };
