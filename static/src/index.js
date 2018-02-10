
import "./index.html";
import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
import { hashHistory } from "dva/router";
import 'antd-mobile/dist/antd-mobile.css';

const mobile = dva({
  ...createLoading(),
  history: hashHistory,
  onError(error) {
    console.error("mobile onError -- ", error);
  }
});

mobile.model(require("./models/mobile"));
mobile.router(require("./mobile_router"));
mobile.start("#app");
