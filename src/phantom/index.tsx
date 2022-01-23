import React from "react";

import { Solana } from "./type";
import Connect from "./connect";

// detecting the provider
// https://docs.phantom.app/integrating/detecting-the-provider
const { solana } = window as any as { solana: Solana };

export default () => {
  if (!solana) {
    window.open("https://phantom.app/", "_blank");
    return (
      <p>
        <i>solana is not detected, opening to phantom.app</i>
      </p>
    );
  }

  if (!solana.isPhantom) {
    window.open("https://phantom.app/", "_blank");

    return (
      <p>
        <i>solana is installed but phantom not, opening phantom.app</i>
      </p>
    );
  }

  if (!solana || !solana.isPhantom) {
    return (
      <p>
        <i>solana is installed but phantom not, opening phantom.app</i>
      </p>
    );
  }

  return (
    <>
      <h1>
        Phantom <small>Solana</small>
      </h1>
      <Connect />
    </>
  );
};
