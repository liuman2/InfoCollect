
import "./mobile.html";
import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
import { hashHistory } from "dva/router";

const app = dva({
  ...createLoading(),
  history: hashHistory,
  onError(error) {
    console.error("mobile onError -- ", error);
  }
});

// app.model(require("./models/mobile"));
// app.router(require("./mobile_router"));
app.start("#app");
