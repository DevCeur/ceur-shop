import { Link, LinkProps } from "@remix-run/react";

interface NavlinkProps extends LinkProps {
  children: React.ReactNode;
}

export const Navlink = ({ children, ...linkProps }: NavlinkProps) => {
  return (
    <Link
      className="text-md text-neutral-600 hover:text-neutral-950 font-semibold transition-all duration-100"
      {...linkProps}
    >
      {children}
    </Link>
  );
};
