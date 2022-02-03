import React from "react";

export const register = async (
  username: string,
  timeout: number
): Promise<Credential | null> => {
  const challenge = new Uint8Array(32);
  const userId = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  crypto.getRandomValues(userId);

  return navigator.credentials.create({
    publicKey: {
      rp: {
        name: "Auth0 WebAuthn Playground",
      },
      user: {
        id: userId,
        name: username,
        displayName: username,
      },
      challenge,
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7, // ES256
        },
      ],
      timeout,
    },
  });
};

export const login = async (
  rawId: ArrayBufferView | ArrayBuffer,
  timeout: number
) => {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);

  return navigator.credentials.get({
    publicKey: {
      challenge,
      timeout,
      allowCredentials: [
        {
          type: "public-key",
          id: rawId,
        },
      ],
    },
  });
};

export default () => {
  const handleRegister = async () => {
    const timeout = 1000;
    const username = "myusername";
    const c = await register(username, timeout);

    if (c) {
      console.log(c);
      console.log(c.id);

      const l = await login((c as any).rawId, 1000);
      console.log(l);
    }
  };

  return <button onClick={handleRegister}>click</button>;
};
