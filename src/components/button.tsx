import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/classUtils";
import { ButtonProps } from "@/types";

const buttonVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "text-sm font-semibold whitespace-nowrap",
    "outline-none focus-visible:outline-none",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-white border border-primary-300 shadow-sm shadow-secondary-700/5 text-primary-100 active:bg-secondary-100",
        secondary:
          "bg-white border border-secondary-300 shadow-sm shadow-secondary-700/5 text-secondary-600 active:bg-secondary-100",
        ghost: "hover:bg-secondary-100 active:bg-secondary-200",
      },
      size: {
        default: "w-fit gap-1 px-3.5 py-2.5",
        icon: "size-10 shrink-0",
      },
      group: {
        default: "rounded-lg",
        left: "rounded-l-lg",
        right: "rounded-r-lg border-l-0",
        center: "border-l-0",
      },
    },
    defaultVariants: {
      variant: "default",
      group: "default",
      size: "default",
    },
  }
);

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, group, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, group, size, className }))}
        ref={ref}
        type="button"
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
