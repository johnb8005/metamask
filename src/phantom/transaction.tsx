import React from "react";
import { PhantomProvider } from "./type";
import { getTransaction, getTransfer, tokens, toPubkey } from "./utils";

import * as solanaWeb3 from "@solana/web3.js";

const { solana } = window as any as { solana: PhantomProvider };

const Transaction = ({ publicKey }: { publicKey: Uint8Array }) => {
  const [amount, setAmount] = React.useState<number | undefined>();
  const [state, setState] = React.useState<number>(0);

  const [token, setToken] = React.useState<string | undefined>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!amount) {
      throw Error("amount must be defined");
    }

    const fromPubkey = new solanaWeb3.PublicKey(publicKey);
    const transfer = await getTransfer(fromPubkey, toPubkey, amount, token);
    const transaction = await getTransaction(transfer, fromPubkey);

    solana.signAndSendTransaction(transaction);
  };

  if (state === 1) {
    return <p>Success</p>;
  }

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit}>
          <div className="input-group ">
            <div className="input-group-prepend">
              <select
                onChange={(v) => {
                  const { value } = v.target;
                  console.log(value);
                  if (value === "SOL") {
                    setToken(undefined);
                    return;
                  }

                  setToken(value);
                }}
                className="form-control"
                placeholder="amount to be sent"
              >
                <option value={undefined}>SOL</option>
                <option value={tokens.usdc}>USDC</option>
                <option value={tokens.usdt}>USDT</option>
              </select>
            </div>
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

export default Transaction;
