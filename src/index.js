import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { RouterServiceProvider } from './services/router-service'

import './init';

ReactDOM.render(
  <RouterServiceProvider>
    <App />
  </RouterServiceProvider>,
  document.getElementById("root"),
);

if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
