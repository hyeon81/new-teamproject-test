import React from "react";
import ReactDOM from "react-dom";
import Root from './client/Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from "./shared/App";

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();