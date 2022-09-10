import React from "react";
import { PhantomProvider } from "./type";
import { Copy } from "./ui-utils";
import { uint8ArrayToHex, verifySig } from "./utils";

import * as solanaWeb3 from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";

const { solana } = window as any as { solana: PhantomProvider };

const Sign = ({ publicKey }: { publicKey: Uint8Array }) => {
  const [amount, setAmount] = React.useState<number | undefined>();
  const [signature, setSignature] = React.useState<
    { signature: Uint8Array; verify: boolean } | undefined
  >();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // sign message
    const encodedMessage = new TextEncoder().encode("");

    const connection = new solanaWeb3.Connection(
      "https://api.mainnet-beta.solana.com",
      "confirmed"
    );

    console.log(connection);

    const toPubkey = new solanaWeb3.PublicKey(
      "BTQJ9ZTaYLaBJNY1M9GA2YFmiFiJ7cR4Rjc4EXucjZA4"
    );
    const fromPubkey = new solanaWeb3.PublicKey(publicKey);

    const lamports = solanaWeb3.LAMPORTS_PER_SOL / 100;

    const transfer = solanaWeb3.SystemProgram.transfer({
      fromPubkey,
      toPubkey,
      lamports,
    });

    const transfer2 = SPLToken.createTransferInstruction(
      fromPubkey,
      toPubkey,
      fromPubkey,
      1,
      undefined,
      SPLToken.TOKEN_PROGRAM_ID
    );

    console.log(solana);

    const transaction = new solanaWeb3.Transaction().add(transfer);
    //  .add(transfer2);

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash("finalized")
    ).blockhash;
    transaction.feePayer = fromPubkey;

    const { signature } = await solana.signAndSendTransaction(transaction);

    //const verify = verifySig(encodedMessage, signature, publicKey);

    // setSignature({ signature, verify });
  };

  if (signature) {
    const hexSignature = uint8ArrayToHex(signature.signature);
    return (
      <>
        <ul>
          <li>
            Message signed <code>{amount}</code>
          </li>
          <li>
            Result <code>{String(signature.verify)}</code>
          </li>
          <li>
            Signature: <code>{hexSignature}</code>
            <br />
            <Copy text={hexSignature} />
          </li>
        </ul>

        <button
          className="btn btn-secondary"
          onClick={() => setSignature(undefined)}
        >
          Reset
        </button>
      </>
    );
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit}>
          <div className="input-group ">
            <input
              type={"number"}
              value={amount || ""}
              onChange={(v) => {
                const { value } = v.target;

                const valueFloat = Number(value);

                setAmount(valueFloat);
              }}
              className="form-control"
              placeholder="amount to be sent"
            />
            <div className="input-group-append">
              <button
                disabled={typeof amount === "undefined"}
                type={"submit"}
                className="btn btn-outline-secondary"
              >
                Transact
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign;
