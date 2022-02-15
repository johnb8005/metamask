import React from "../_snowpack/pkg/react.js";
import CryptoAnalyticsPlugin from "../_snowpack/pkg/@nexys/crypto-analytics-plugin.js";
if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
}
const {ethereum} = window;
export default () => {
  const [ethAddress, setEthAddress] = React.useState();
  if (ethAddress) {
    const c = new CryptoAnalyticsPlugin("web3", {ethereum: ethAddress}, "metamask");
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "MetaMask"), ethereum && /* @__PURE__ */ React.createElement("p", null, "Meta mask is installed"), !ethAddress && /* @__PURE__ */ React.createElement("button", {
    className: "btn btn-primary",
    onClick: async () => {
      const r = await ethereum.request({
        method: "eth_requestAccounts"
      });
      if (r.length > 0) {
        setEthAddress(r[0]);
      }
    }
  }, "Request"), ethAddress && /* @__PURE__ */ React.createElement("code", null, ethAddress));
};
