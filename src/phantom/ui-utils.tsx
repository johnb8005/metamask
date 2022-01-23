import React from "react";

export const Copy = ({ text }: { text: string }) => {
  const [copied, setCopied] = React.useState<boolean>(false);
  const handleCopy = async () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  const label = copied === true ? "Copied" : "Copy";
  const color = copied === false ? "primary" : "secondary";

  return (
    <button
      disabled={copied}
      className={"btn btn-sm btn-" + color}
      onClick={handleCopy}
    >
      {label}
    </button>
  );
};
