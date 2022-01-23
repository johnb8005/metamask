export interface SolanaPublicKey {
  toString: () => string;
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
}
