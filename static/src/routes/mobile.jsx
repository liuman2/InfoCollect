import React, { PropTypes } from "react";
import { connect } from "dva";
// import Login from "./mobile/login";
import { withRouter } from "dva/router";
import style from './mobile.css'

const Mobile = ({ children, location, dispatch, lxhApp, loading }) => {
  console.log(lxhApp)
  const {
    login
  } = lxhApp;

  return (
    <div>
      {/* {login ? <div>{children}</div> :<Login />} */}
      <div>{children}</div>
    </div>
  );
};

Mobile.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  lxhApp: PropTypes.object,
  loading: PropTypes.bool
};

export default withRouter(
  connect(({ lxhApp }) => ({ lxhApp }))(Mobile)
);
