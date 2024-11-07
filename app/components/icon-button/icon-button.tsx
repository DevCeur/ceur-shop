import type { Icon } from "react-feather";
import type { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: Icon;
}

export const IconButton = ({ icon: Icon, ...buttonProps }: IconButtonProps) => {
  return (
    <button
      className="w-12 h-12 flex justify-center items-center border border-neutral-200"
      {...buttonProps}
    >
      <Icon width={16} />
    </button>
  );
};
