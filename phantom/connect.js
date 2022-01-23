import React from "../_snowpack/pkg/react.js";
const {solana} = window;
const network = "https://api.devnet.solana.com";
solana.on("connect", () => console.log("connected!"));
solana.on("disconnect", () => console.log("disconnected!"));
const Connect = () => {
  const [solAddress, setSolAddress] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const handleConnect = async () => {
    setLoading(true);
    const resp = await solana.connect();
    console.log(resp);
    setLoading(false);
    if (resp.publicKey) {
      setSolAddress(resp.publicKey.toString());
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
    onClick: handleConnect
  }, "Connect"), solAddress && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("code", null, solAddress), /* @__PURE__ */ React.createElement("button", {
    onClick: handleDisconnect
  }, "Disconnect")));
};
export default Connect;
