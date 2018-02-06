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
import style from './mobile.css'

const { Header, Bread, Footer, Sider, styles } = Layout;
let loginPage = "";

const App = ({ children, location, dispatch, mobile, loading }) => {
  console.log(mobile)
  return (
    <div>
      <div className="avatar">
        <img className="profile-face" src="https://sfault-avatar.b0.upaiyun.com/368/958/368958767-58f71f4b5e79c_big64" />
      </div>

      <div>
        <span>欢迎您，</span>
      </div>
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
