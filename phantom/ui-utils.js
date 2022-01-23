import React from "../_snowpack/pkg/react.js";
export const Copy = ({text}) => {
  const [copied, setCopied] = React.useState(false);
  const handleCopy = async () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  const label = copied === true ? "Copied" : "Copy";
  const color = copied === false ? "primary" : "secondary";
  return /* @__PURE__ */ React.createElement("button", {
    disabled: copied,
    className: "btn btn-sm btn-" + color,
    onClick: handleCopy
  }, label);
};
