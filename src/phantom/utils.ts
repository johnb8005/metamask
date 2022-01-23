import BN from "bn.js";
import TweetNaCl from "tweetnacl";

export const bnToUint8Array = (bn: BN) => Uint8Array.from(bn.toArray());

export const verifySig = TweetNaCl.sign.detached.verify;
