import React from "./_snowpack/pkg/react.js";
import {Route, Switch} from "./_snowpack/pkg/react-router-dom.js";
import Home from "./home.js";
import Phantom from "./phantom/index.js";
import MetaMask from "./meta-mask.js";
const NotFound = () => /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("i", null, "Page Not Found"));
export default () => {
  return /* @__PURE__ */ React.createElement(Switch, null, /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/",
    component: Home
  }), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/phantom",
    component: Phantom
  }), /* @__PURE__ */ React.createElement(Route, {
    exact: true,
    path: "/metamask",
    component: MetaMask
  }), /* @__PURE__ */ React.createElement(Route, {
    component: NotFound
  }));
};
