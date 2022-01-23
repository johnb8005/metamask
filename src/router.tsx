import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./home";
import Phantom from "./phantom";
import MetaMask from "./meta-mask";

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
      <Route component={NotFound} />
    </Switch>
  );
};
