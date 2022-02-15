import React from "react";

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

export default () => {
  const [ethAddress, setEthAddress] = React.useState<string | undefined>();

  return (
    <>
      <h1>MetaMask</h1>

      {ethereum && <p>Meta mask is installed</p>}

      {!ethAddress && (
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
      )}

      {ethAddress && <code>{ethAddress}</code>}
    </>
  );
};
