import React from "react";

import { Solana } from "./type";
import Connect from "./connect";

// detecting the provider
// https://docs.phantom.app/integrating/detecting-the-provider
const { solana } = window as any as { solana: Solana };

const phantomUrl = "https://phantom.app/";

export default () => {
  if (!solana) {
    window.open(phantomUrl, "_blank");
    return (
      <p>
        <i>solana is not detected, opening to phantom.app</i>
      </p>
    );
  }

  if (!solana.isPhantom) {
    window.open(phantomUrl, "_blank");

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

  solana.on("connect", () => console.log("connected!"));
  solana.on("disconnect", () => console.log("disconnected!"));

  return (
    <>
      <h1>
        Phantom <small>Solana</small>
      </h1>
      <Connect />
    </>
  );
};
