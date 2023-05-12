import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "./assets/font/font1/iconfont.css";
import "./assets/font/font-vip/iconfont.css";
import "./assets/styles/reset.less";
import "./rem";
import store from "./store/index.js";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import "swiper/dist/css/swiper.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </>
);
