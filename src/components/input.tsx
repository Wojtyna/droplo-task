import { forwardRef } from "react";
import Image from "next/image";

import { cn } from "@/lib/classUtils";
import { IconSize } from "@/lib/constans";

interface InputProps extends React.ComponentProps<"input"> {
  iconSrc?: string;
  iconAlt?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, title, type, iconSrc, iconAlt, ...props }, ref) => {
    const isIcon = iconSrc && iconAlt;

    return (
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">{title}</span>
        <div className="relative">
          {isIcon && (
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 size-5 pointer-events-none">
              <Image
                aria-hidden
                src={iconSrc}
                alt={iconAlt}
                width={IconSize.m}
                height={IconSize.m}
              />
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg px-3 py-2",
              "outline-none focus-visible:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "bg-white border border-secondary-300 shadow-sm shadow-secondary-700/5 text-secondary-600",
              "placeholder:text-secondary-400",
              isIcon && "pl-11",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
