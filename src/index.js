import React from "react";
import ReactDOM from "react-dom";

import Amplify from "aws-amplify";
import config from "./aws-exports";

import App from "./App";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss?v=1.2.0";
import "assets/demo/demo.css?v=1.2.0";
// pages

// others

Amplify.configure(config);

ReactDOM.render(<App />, document.getElementById("root"));
