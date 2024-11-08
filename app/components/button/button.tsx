import { cva } from "class-variance-authority";

import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { SpecialText } from "../special-text";

const buttonStyles = cva(
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

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: string;
}

export const Button = ({
  children,
  variant,
  size,
  width,
  ...buttonProps
}: ButtonProps) => {
  return (
    <button {...buttonProps} className={buttonStyles({ variant, size, width })}>
      <SpecialText>{children}</SpecialText>
    </button>
  );
};
