import { Link, LinkProps } from "@remix-run/react";

interface NavlinkProps extends LinkProps {
  children: React.ReactNode;
}

export const Navlink = ({ children, ...linkProps }: NavlinkProps) => {
  return (
    <Link
      className="text-2xl md:text-sm font-medium uppercase text-neutral-600 hover:text-neutral-950 transition-all duration-100"
      {...linkProps}
    >
      {children}
    </Link>
  );
};
