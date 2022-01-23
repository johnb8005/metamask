import BigNumber from "bn.js";

export interface SolanaPublicKey {
  toString: () => string;
  _bn: BigNumber;
}
type Actions = "connect" | "disconnect";

interface CallbackOneParam {
  (param1: Actions): void;
  (): void;
}

export interface Solana {
  isPhantom: boolean;
  on: any; //CallbackOneParam;
  connect: () => Promise<{ publicKey: SolanaPublicKey }>;
  disconnect: () => Promise<void>;
  signMessage: (
    message: Uint8Array,
    encodingType: "utf8"
  ) => Promise<{ signature: Uint8Array }>;
}
