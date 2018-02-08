import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { List, InputItem, Button, WhiteSpace, } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from "./login.less";

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      mobile: '',
      password: '',
    };
  }

  componentDidMount() {

  }

  doLogin(doLogin) {
    const { mobile, password } = this.state;
    this.props.dispatch({
      type: "mobile/signin",
      payload: { mobile, password }
    });
  }


  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginTitle}>
          <span>乐享惠</span>
        </div>
        <div className={styles.loginSubTitle}>
          <span>好生活，乐享惠</span>
        </div>
        <List>
          <InputItem
            {...getFieldProps('mobile')}
            type="phone"
            placeholder="输入手机"
          >手机号码</InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="****"
          >密码</InputItem>
        </List>
        <div className={styles.loginButton}>
          <Button className={styles.loginBtn}>登录</Button><WhiteSpace />
          <Button className={styles.registerBtn}>注册</Button><WhiteSpace />
        </div>
      </div>
    );
  }
}

export default connect(({ loginUser }) => {
  console.log(loginUser)
  return {

  };
})(createForm()(Login));

// export default Form.create()(login);