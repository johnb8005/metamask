import { PublicKey, Transaction } from "@solana/web3.js";
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
  connect: (opt?: any) => Promise<{ publicKey: SolanaPublicKey }>;
  disconnect: () => Promise<void>;
  signMessage: (
    message: Uint8Array,
    encodingType: "utf8"
  ) => Promise<{ signature: Uint8Array }>;
  signTransaction: any;
  signAndSendTransaction: any;
}

type DisplayEncoding = "utf8" | "hex";
type PhantomEvent = "disconnect" | "connect" | "accountChanged";
type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signTransaction"
  | "signAllTransactions"
  | "signMessage";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signTransaction: (transaction: Transaction) => Promise<Transaction>;
  signAndSendTransaction: (transaction: Transaction) => any;
  signAllTransactions: (transactions: Transaction[]) => Promise<Transaction[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}
