import type { Icon } from "react-feather";
import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
}

export const IconButton = ({ icon: Icon, ...buttonProps }: IconButtonProps) => {
  return (
    <button {...buttonProps}>
      <Icon />
    </button>
  );
};
