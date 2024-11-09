import { Link, LinkProps } from "@remix-run/react";

import { SpecialText } from "../special-text";

interface NavlinkProps extends LinkProps {
  children: string;
}

export const Navlink = ({ children, ...linkProps }: NavlinkProps) => {
  return (
    <Link
      className="text-sm font-medium uppercase text-neutral-400 hover:text-white transition-all duration-100"
      {...linkProps}
    >
      <SpecialText>{children}</SpecialText>
    </Link>
  );
};
