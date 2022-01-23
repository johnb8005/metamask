import React from "react";
import { Solana } from "./type";
import { verifySig } from "./utils";

const { solana } = window as any as { solana: Solana };

const Sign = ({ publicKey }: { publicKey: Uint8Array }) => {
  const [message, setMessage] = React.useState<string | undefined>();
  const [signature, setSignature] = React.useState<
    { signature: Uint8Array; verify: boolean } | undefined
  >();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // sign message
    const encodedMessage = new TextEncoder().encode(message);
    const { signature } = await solana.signMessage(encodedMessage, "utf8");

    const verify = verifySig(encodedMessage, signature, publicKey);

    setSignature({ signature, verify });
  };

  if (signature) {
    return (
      <>
        <p>
          Result <code>{String(signature.verify)}</code>
        </p>
        <code>{signature.signature.toLocaleString()}</code>
      </>
    );
  }

  return (
    <div className="row">
      <div className="col-md-3">
        <form onSubmit={handleSubmit}>
          <div className="input-group ">
            <input
              type={"text"}
              value={message || ""}
              onChange={(v) => setMessage(v.target.value)}
              className="form-control"
              placeholder="text to be signed"
            />
            <div className="input-group-append">
              <button
                disabled={typeof message === "undefined" || message === ""}
                type={"submit"}
                className="btn btn-outline-secondary"
              >
                Sign
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign;
