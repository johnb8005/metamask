import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home";
import Phantom from "./phantom";
import MetaMask from "./meta-mask";
import Webauthn from "./webauthn";

const NotFound = () => (
  <p>
    <i>Page Not Found</i>
  </p>
);

export default () => {
  return (
    <Switch>
      <Route exact path={"/"} component={Home} />
      <Route exact path={"/phantom"} component={Phantom} />
      <Route exact path={"/metamask"} component={MetaMask} />
      <Route exact path={"/webauthn"} component={Webauthn} />
      <Route component={NotFound} />
    </Switch>
  );
};
