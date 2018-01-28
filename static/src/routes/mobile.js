import React, { PropTypes } from "react";
import { connect } from "dva";
import Login from "./login";
import { Layout } from "../components";
import { Spin, Modal, Input, message } from "antd";
import { classnames, config } from "../utils";
import { Helmet } from "react-helmet";
import "../components/skin.less";
import Cookie from "../utils/js.cookie";
import { withRouter } from "dva/router";

const { Header, Bread, Footer, Sider, styles } = Layout;
let loginPage = "";

const App = ({ children, location, dispatch, mobile, loading }) => {
  return (
    <div>
      手机版
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.bool
};

export default withRouter(
  connect(({ mobile }) => ({ mobile }))(App)
);
