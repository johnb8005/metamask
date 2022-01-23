import React from "../_snowpack/pkg/react.js";
import Connect from "./connect.js";
const {solana} = window;
export default () => {
  if (!solana) {
    window.open("https://phantom.app/", "_blank");
    return /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "solana is not detected, opening to phantom.app"));
  }
  if (!solana.isPhantom) {
    window.open("https://phantom.app/", "_blank");
    return /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "solana is installed but phantom not, opening phantom.app"));
  }
  if (!solana || !solana.isPhantom) {
    return /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "solana is installed but phantom not, opening phantom.app"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Phantom ", /* @__PURE__ */ React.createElement("small", null, "Solana")), /* @__PURE__ */ React.createElement(Connect, null));
};
