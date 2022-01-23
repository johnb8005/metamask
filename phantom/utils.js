import TweetNaCl from "../_snowpack/pkg/tweetnacl.js";
export const bnToUint8Array = (bn) => Uint8Array.from(bn.toArray());
export const verifySig = TweetNaCl.sign.detached.verify;
export const uint8ArrayToHex = (uint8) => [...new Uint8Array(uint8)].map((b) => b.toString(16).padStart(2, "0")).join("");
