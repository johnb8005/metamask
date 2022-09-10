import React from "react";

import CryptoAnalyticsPlugin from "@nexys/crypto-analytics-plugin";
import { Solana } from "./type";
import Sign from "./sign";
import Transaction from "./transaction";

import { bnToUint8Array } from "./utils";

// detecting the provider
// https://docs.phantom.app/integrating/detecting-the-provider
const { solana } = window as any as { solana: Solana };

const Connect = () => {
  const [solAddress, setSolAddress] = React.useState<
    { s: string; u: Uint8Array } | undefined
  >();

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleConnect = async () => {
    setLoading(true);

    const resp = await solana.connect({ onlyIfTrusted: true });

    setLoading(false);

    if (resp.publicKey) {
      const s = resp.publicKey.toString();
      const u = bnToUint8Array(resp.publicKey._bn);

      setSolAddress({ s, u });
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    await solana.disconnect();
    setLoading(false);
    setSolAddress(undefined);
  };

  // add to analytics
  if (solAddress) {
    new CryptoAnalyticsPlugin("web3", { solana: solAddress.s });
  }

  if (loading) {
    return (
      <p>
        <i>loading</i>
      </p>
    );
  }

  return (
    <>
      {!solAddress && (
        <button className="btn btn-primary" onClick={handleConnect}>
          Connect
        </button>
      )}

      {solAddress && (
        <>
          <p>
            Public Key: <code>{solAddress.s}</code>
          </p>
          <h3>Signature</h3>
          <Sign publicKey={solAddress.u} />
          <h3>Transaction</h3>
          <Transaction publicKey={solAddress.u} />
          <hr />
          <button className="btn btn-secondary" onClick={handleDisconnect}>
            Disconnect
          </button>
        </>
      )}
    </>
  );
};

export default Connect;
