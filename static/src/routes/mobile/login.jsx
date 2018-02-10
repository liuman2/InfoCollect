import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { List, InputItem, Button, WhiteSpace, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from "./login.less";

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    
  }

  onLogin() {
    const mobile = this.props.form.getFieldValue('mobile').replace(/\s+/g, '');
    const password = this.props.form.getFieldValue('password');
    if (!mobile) {
      Toast.info('手机不能为空');
      return;
    }
    if (!password) {
      Toast.info('密码不能为空');
      return;
    }
    this.setState({isLoading: true});
    this.props.dispatch({
      type: "lxhApp/signin",
      payload: { mobile, password }
    });
  }


  render() {
    const { getFieldProps } = this.props.form;
    const { isLoading } = this.state;
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
            // type="phone"
            placeholder="输入手机"
          ></InputItem>
          <InputItem
            {...getFieldProps('password')}
            type="password"
            placeholder="密码"
          ></InputItem>
        </List>
        <div className={styles.loginButton}>
          <Button
            loading={isLoading}            
            onClick={this.onLogin.bind(this)}
            className={styles.loginBtn}
          >
            登录
          </Button>
          <WhiteSpace />
          <Button className={styles.registerBtn}>注册</Button><WhiteSpace />
        </div>
        <div className={styles.retriveBtn}>
        <a>忘记密码</a>
        </div>
      </div>
    );
  }
}

export default connect()(createForm()(Login));

// export default Form.create()(login);