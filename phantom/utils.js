import TweetNaCl from "../_snowpack/pkg/tweetnacl.js";
export const bnToUint8Array = (bn) => Uint8Array.from(bn.toArray());
export const verifySig = TweetNaCl.sign.detached.verify;
