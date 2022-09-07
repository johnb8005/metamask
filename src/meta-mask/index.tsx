import React from "react";

import CryptoAnalyticsPlugin from "@nexys/crypto-analytics-plugin";

if (typeof (window as any).ethereum !== "undefined") {
  console.log("MetaMask is installed!");
}

type EthereumMethod =
  | "eth_requestAccounts"
  | "eth_sendTransaction"
  | "eth_sign"
  | "personalSign"
  | "eth_signTypedData";

//  https://docs.metamask.io/guide/ethereum-provider.html#events
type EthereumEvents = "accountsChanged" | "chainChanged";

interface Ethereum {
  // https://docs.metamask.io/guide/ethereum-provider.html#ethereum-request-args
  request: (args: {
    method: EthereumMethod;
    params?: unknown[] | object;
  }) => Promise<string[]>;
  on: any; //(onType: EthereumOn)//, (accounts:string[]) => void)
}

const { ethereum } = window as any; //as { ethereum: Ethereum };

/*
ethereum.personal_sign(
  "0x43f5754fd1172Afb28eEd21309228D07acf5bEA2",
  "hexEncodedUtf8Message"
);*/

const Body = () => {
  const [ethAddress, setEthAddress] = React.useState<string | undefined>();

  const handleDisconnect = () => {
    setEthAddress(undefined);
  };

  if (!ethAddress) {
    return (
      <button
        className="btn btn-primary"
        onClick={async () => {
          const r: string[] = await ethereum.request({
            method: "eth_requestAccounts",
          });

          if (r.length > 0) {
            setEthAddress(r[0]);
          }
        }}
      >
        Request
      </button>
    );
  }

  const c = new CryptoAnalyticsPlugin(
    "web3",
    { ethereum: ethAddress },
    "metamask"
  );

  return (
    <>
      <p>Meta mask is installed</p>

      <code>{ethAddress}</code>

      <p>
        <button onClick={handleDisconnect} className="btn btn-secondary btn-sm">
          Disconnect
        </button>
      </p>
    </>
  );
};

export default () => {
  return (
    <>
      <h1>MetaMask</h1>
      <Body />
    </>
  );
};
