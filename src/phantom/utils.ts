import * as solanaWeb3 from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";

export const tokens = {
  usdt: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  usdc: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
};

export const toPubkey = new solanaWeb3.PublicKey(
  "BTQJ9ZTaYLaBJNY1M9GA2YFmiFiJ7cR4Rjc4EXucjZA4"
);

export const getTransfer = async (
  fromPubkey: solanaWeb3.PublicKey,
  toPubkey: solanaWeb3.PublicKey,
  value: number,
  tokenAddress?: string
): Promise<solanaWeb3.TransactionInstruction> => {
  if (!tokenAddress) {
    const lamports = (value * solanaWeb3.LAMPORTS_PER_SOL) / 100;
    const transfer = solanaWeb3.SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    });

    return transfer;
  }

  const token = new solanaWeb3.PublicKey(tokens.usdc);

  const fromTokenAccount = await SPLToken.getAssociatedTokenAddress(
    token,
    fromPubkey
  );

  SPLToken.getOrCreateAssociatedTokenAccount;

  const associatedDestinationTokenAddr =
    await SPLToken.getAssociatedTokenAddress(token, toPubkey);

  return SPLToken.createTransferInstruction(
    fromTokenAccount,
    associatedDestinationTokenAddr,
    fromPubkey,
    value * 1000000
  );
};

export const getTransaction = async (
  transfer: solanaWeb3.TransactionInstruction,
  feePayer: solanaWeb3.PublicKey
): Promise<any> => {
  const connection = new solanaWeb3.Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
  );

  const transaction = new solanaWeb3.Transaction().add(transfer);
  transaction.recentBlockhash = (
    await connection.getLatestBlockhash("finalized")
  ).blockhash;
  transaction.feePayer = feePayer;

  return transaction;
};
