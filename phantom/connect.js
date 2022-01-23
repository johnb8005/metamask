import React from "../_snowpack/pkg/react.js";
import Sign from "./sign.js";
import {bnToUint8Array} from "./utils.js";
const {solana} = window;
solana.on("connect", () => console.log("connected!"));
solana.on("disconnect", () => console.log("disconnected!"));
const Connect = () => {
  const [solAddress, setSolAddress] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const handleConnect = async () => {
    setLoading(true);
    const resp = await solana.connect();
    setLoading(false);
    if (resp.publicKey) {
      const s = resp.publicKey.toString();
      const u = bnToUint8Array(resp.publicKey._bn);
      setSolAddress({s, u});
    }
  };
  const handleDisconnect = async () => {
    setLoading(true);
    await solana.disconnect();
    setLoading(false);
    setSolAddress(void 0);
  };
  if (loading) {
    return /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "loading"));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, !solAddress && /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-primary",
    onClick: handleConnect
  }, "Connect"), solAddress && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Public Key: ", /* @__PURE__ */ React.createElement("code", null, solAddress.s)), /* @__PURE__ */ React.createElement("h3", null, "Signature"), /* @__PURE__ */ React.createElement(Sign, {
    publicKey: solAddress.u
  }), /* @__PURE__ */ React.createElement("hr", null), /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-secondary",
    onClick: handleDisconnect
  }, "Disconnect")));
};
export default Connect;
