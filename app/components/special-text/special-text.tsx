const formatText = (text: string) => {
  const formattedText = text.trim().toUpperCase().replaceAll(" ", "_");

  return formattedText;
};

interface SpecialTextProps {
  children: string;
}

export const SpecialText = ({ children }: SpecialTextProps) => {
  return (
    <>
      <span className="sr-only">{children}</span>

      {formatText(children)}
    </>
  );
};
