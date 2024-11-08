import { cva } from "class-variance-authority";

import type { Icon } from "react-feather";
import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

const iconButtonStyles = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "hover:bg-neutral-900",
    "border",
    "border-neutral-700",
    "disabled:pointer-events-none disabled:opacity-50",
    "transition-colors duration-150",
  ],
  {
    variants: {
      size: {
        small: ["w-8", "h-8"],

        default: ["w-10", "h-10"],
      },
    },

    defaultVariants: {
      size: "default",
    },
  }
);

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonStyles> {
  icon: Icon;
}

export const IconButton = ({ icon: Icon, size, ...buttonProps }: IconButtonProps) => {
  return (
    <button className={iconButtonStyles({ size })} {...buttonProps}>
      <Icon width={14} />
    </button>
  );
};
