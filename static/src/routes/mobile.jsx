import React, { PropTypes } from "react";
import { connect } from "dva";
import Login from "./profile/login";
import { withRouter } from "dva/router";
import style from './mobile.css'

// const { Header, Bread, Footer, Sider, styles } = Layout;
let loginPage = "";

const App = ({ children, location, dispatch, mobile, loading }) => {
  console.log(mobile)
  const {
    login
  } = app;

  return (
    <div>
      {login ? (
        <div className="profile">
        <div className="avatar">
          <img className="profile-face" src="https://sfault-avatar.b0.upaiyun.com/368/958/368958767-58f71f4b5e79c_big64" />
        </div>
        <div className="profile-message">
          <div>
            <span>欢迎您，李四</span>
          </div>
          <div>
            <span className="mr10">您当前的状态为</span>
            <span className="green">已审核</span>
          </div>
          <div>
            <a>查看我的资料</a>
          </div>
        </div>
      </div>
      ) : (
        <Login />
      )}
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
