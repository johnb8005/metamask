import React from "../_snowpack/pkg/react.js";
import {Copy} from "./ui-utils.js";
import {uint8ArrayToHex, verifySig} from "./utils.js";
const {solana} = window;
const Sign = ({publicKey}) => {
  const [message, setMessage] = React.useState();
  const [signature, setSignature] = React.useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const encodedMessage = new TextEncoder().encode(message);
    const {signature: signature2} = await solana.signMessage(encodedMessage, "utf8");
    const verify = verifySig(encodedMessage, signature2, publicKey);
    setSignature({signature: signature2, verify});
  };
  if (signature) {
    const hexSignature = uint8ArrayToHex(signature.signature);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("ul", null, /* @__PURE__ */ React.createElement("li", null, "Message signed ", /* @__PURE__ */ React.createElement("code", null, message)), /* @__PURE__ */ React.createElement("li", null, "Result ", /* @__PURE__ */ React.createElement("code", null, String(signature.verify))), /* @__PURE__ */ React.createElement("li", null, "Signature: ", /* @__PURE__ */ React.createElement("code", null, hexSignature), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(Copy, {
      text: hexSignature
    }))), /* @__PURE__ */ React.createElement("button", {
      className: "btn btn-secondary",
      onClick: () => setSignature(void 0)
    }, "Reset"));
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "col-md-3"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: handleSubmit
  }, /* @__PURE__ */ React.createElement("div", {
    className: "input-group "
  }, /* @__PURE__ */ React.createElement("input", {
    type: "text",
    value: message || "",
    onChange: (v) => setMessage(v.target.value),
    className: "form-control",
    placeholder: "text to be signed"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "input-group-append"
  }, /* @__PURE__ */ React.createElement("button", {
    disabled: typeof message === "undefined" || message === "",
    type: "submit",
    className: "btn btn-outline-secondary"
  }, "Sign"))))));
};
export default Sign;
