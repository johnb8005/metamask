import React from "../_snowpack/pkg/react.js";
export const register = async (username, timeout) => {
  const challenge = new Uint8Array(32);
  const userId = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  crypto.getRandomValues(userId);
  return navigator.credentials.create({
    publicKey: {
      rp: {
        name: "Auth0 WebAuthn Playground"
      },
      user: {
        id: userId,
        name: username,
        displayName: username
      },
      challenge,
      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7
        }
      ],
      timeout
    }
  });
};
export const login = async (rawId, timeout) => {
  const challenge = new Uint8Array(32);
  crypto.getRandomValues(challenge);
  return navigator.credentials.get({
    publicKey: {
      challenge,
      timeout,
      allowCredentials: [
        {
          type: "public-key",
          id: rawId
        }
      ]
    }
  });
};
export default () => {
  const handleRegister = async () => {
    const timeout = 1e3;
    const username = "myusername";
    const c = await register(username, timeout);
    if (c) {
      console.log(c);
      console.log(c.id);
      const l = await login(c.rawId, 1e3);
      console.log(l);
    }
  };
  return /* @__PURE__ */ React.createElement("button", {
    onClick: handleRegister
  }, "click");
};
