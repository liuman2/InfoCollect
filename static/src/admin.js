import "./admin.html";
import "babel-polyfill";
import dva from "dva";
import createLoading from "dva-loading";
// import { browserHistory } from 'dva/router';
import { hashHistory } from "dva/router";

const admin = dva({
  ...createLoading(),
  history: hashHistory,
  onError(error) {
    console.error("app onError -- ", error);
  }
});

admin.model(require("./models/app"));
admin.router(require("./router"));
admin.start("#app");
