import { Link, LinkProps } from "@remix-run/react";

interface NavlinkProps extends LinkProps {
  children: React.ReactNode;
}

export const Navlink = ({ children, ...linkProps }: NavlinkProps) => {
  return (
    <Link
      className="text-2xl md:text-sm font-medium uppercase text-neutral-400 hover:text-white transition-all duration-100"
      {...linkProps}
    >
      {children}
    </Link>
  );
};
