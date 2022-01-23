import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <ul>
      <li>
        <Link to={"/metamask"}>MetaMask</Link>
      </li>
      <li>
        <Link to={"/phantom"}>Phantom</Link>
      </li>
    </ul>
  );
};
