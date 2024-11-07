interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

export const FooterLink = ({ href, children }: FooterLinkProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-neutral-400 hover:text-neutral-700 transition-all duration-100"
    >
      {children}
    </a>
  );
};
