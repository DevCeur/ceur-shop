import { Link } from "@remix-run/react";
import { cva } from "class-variance-authority";

import type { VariantProps } from "class-variance-authority";
import type { LinkProps } from "@remix-run/react";

const ctaStyles = cva(
  [
    "text-white",
    "font-medium",
    "border",
    "transition-all duration-150",
    "flex justify-center items-center",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-neutral-900 hover:bg-neutral-800", "border-transparent"],

        secondary: ["border-neutral-800"],
      },

      size: {
        small: ["h-9", "px-4", "text-xs"],

        default: ["h-12", "px-6", "text-base"],
      },

      width: {
        auto: ["w-max"],

        full: ["w-full flex-1"],
      },
    },

    defaultVariants: {
      variant: "secondary",
      size: "default",
      width: "auto",
    },
  }
);

interface CtaProps extends LinkProps, VariantProps<typeof ctaStyles> {
  children: string;
}

export const Cta = ({ children, size, width, variant, ...linkProps }: CtaProps) => {
  return (
    <Link className={ctaStyles({ size, width, variant })} {...linkProps}>
      {children}
    </Link>
  );
};
