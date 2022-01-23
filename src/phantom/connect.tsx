import React from "react";

import { Solana } from "./type";

// detecting the provider
// https://docs.phantom.app/integrating/detecting-the-provider
const { solana } = window as any as { solana: Solana };

const network = "https://api.devnet.solana.com";
//const connection = new Connection(network);

solana.on("connect", () => console.log("connected!"));
solana.on("disconnect", () => console.log("disconnected!"));

const Connect = () => {
  const [solAddress, setSolAddress] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);

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
    setSolAddress(undefined);
  };

  if (loading) {
    return (
      <p>
        <i>loading</i>
      </p>
    );
  }

  return (
    <>
      {!solAddress && <button onClick={handleConnect}>Connect</button>}

      {solAddress && (
        <>
          <code>{solAddress}</code>
          <button onClick={handleDisconnect}>Disconnect</button>
        </>
      )}
    </>
  );
};

export default Connect;
