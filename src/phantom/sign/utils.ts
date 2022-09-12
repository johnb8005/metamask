import BN from "bn.js";
import TweetNaCl from "tweetnacl";
import * as solanaWeb3 from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";

export const bnToUint8Array = (bn: BN) => Uint8Array.from(bn.toArray());

export const verifySig = TweetNaCl.sign.detached.verify;

export const uint8ArrayToHex = (uint8: Uint8Array) =>
  [...new Uint8Array(uint8)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
