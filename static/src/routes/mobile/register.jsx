import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { List, InputItem, Button, Toast, NavBar, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
import { request } from "../../utils";
import styles from "./register.less";
const Item = List.Item;
class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    }
  }

  componentDidMount() {

  }

  onBack() {
    // this.props.dispatch(routerRedux.replace({ pathname: `/profile/detail/${loginUserId}` }));
  }


  render() {
    const { getFieldProps } = this.props.form;
    const { loading } = this.props;
    return (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type='left' />}
          onLeftClick={this.onBack.bind(this)}
        >注册</NavBar>
        <div className={styles.registerPage}>
          <List>
            <InputItem
              {...getFieldProps('mobile')}
              type="phone"
              placeholder="注册手机号码"
            ></InputItem>
            <Item              
              extra={<Button className={styles.codeBtn}>获取验证码</Button>}
            >
              <input placeholder="填写验证码" className={styles.custInput} />
            </Item>
            <InputItem
              {...getFieldProps('name')}
              placeholder="您的姓名"
            ></InputItem>
            <InputItem
              {...getFieldProps('password')}
              type="password"
              placeholder="设置密码"
            ></InputItem>
          </List>
          <div className={styles.mt20}>
            <Button
              type='primary'
            >
              注册
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(createForm()(Register));