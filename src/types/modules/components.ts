import { buttonVariants } from "@/components/button";
import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ComponentProps } from "react";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export interface InputProps extends ComponentProps<"input"> {
  iconSrc?: string;
  iconAlt?: string;
}
