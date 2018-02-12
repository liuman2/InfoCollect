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
      interval: null,
      verify: '',
    }
  }

  componentDidMount() {

  }

  onBack() {
    // this.props.dispatch(routerRedux.replace({ pathname: `/profile/detail/${loginUserId}` }));
  }

  async onRegister() {
    const { verify } = this.state;
    let mobile = this.props.form.getFieldValue('mobile') || '';
    let name = this.props.form.getFieldValue('name') || '';
    let password = this.props.form.getFieldValue('password') || '';
    if (!mobile.replace(/\s+/g, '')) {
      Toast.info('手机不能为空', 3, null, false);
      return;
    }
    mobile = mobile.replace(/\s+/g, '');
    if (!(new RegExp(/^1[3-9]\d{9}$/)).test(mobile)) {
      Toast.info('请输入正确的手机号', 3, null, false);
      return;
    }
    if (!verify) {
      Toast.info('验证码不能为空', 3, null, false);
      return;
    }
    if (!name) {
      Toast.info('姓名不能为空', 3, null, false);
      return;
    }
    if (!password) {
      Toast.info('密码不能为空', 3, null, false);
      return;
    }
    if (!(new RegExp(/^[0-9a-zA-Z]{6,16}$/)).test(password)) {
      Toast.info('密码由6-16位数字、字母组成', 3, null, false);
			return;
		}

    const result = await request({
      url: '/api/user/register',
      method: 'POST',
      data: {
        mobile: mobile,
        password: password,
        nick_name: name,
        verify: verify
      }
    }).then((data) => {
      
    }).catch((e) => {
      Toast.info(e.response.data.message || '获取失败')
    });
  }

  startInterval() {
    let t = 90;
    const timerLoop = setInterval(() => {
      if (t <= 0) {
        clearInterval(timerLoop);
        this.setState({
          interval: null
        });
        return;
      }
      if (t > 0) {
        this.setState({
          interval: t
        });
      }
      t--;
    }, 1000);
  }

  async sendVerity() {
    const { interval } = this.state;
    if (interval !== null) return;
    let mobile = this.props.form.getFieldValue('mobile') || '';
    if (!mobile.replace(/\s+/g, '')) {
      Toast.info('手机不能为空', 3, null, false);
      return;
    }
    mobile = mobile.replace(/\s+/g, '');
    if (!(new RegExp(/^1[3-9]\d{9}$/)).test(mobile)) {
      Toast.info('请输入正确的手机号', 3, null, false);
      return;
    }

    this.startInterval();
    const tok = `${mobile}:register`;
    const hash = btoa(encodeURIComponent(tok).toLocaleLowerCase());
    const header = 'lxh-app ' + hash;
    const result = await request({
      url: '/api/sms/verify',
      method: 'POST',
      headers: {
        'lxh-sms': header
      },
      data: {
        mobile: mobile,
        type: 'register'
      }
    }).catch((e) => {
      Toast.info(e.response.data.message || '获取失败')
    });
  }

  onVerity(e) {
    console.log(e.target.value)
    this.setState({
      verify: e.target.value
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { loading } = this.props;
    const { interval } = this.state;
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
              extra={<Button className={styles.codeBtn} disabled={interval !== null} onClick={this.sendVerity.bind(this)}>{`${interval === null ? '获取验证码' : `${interval}秒`}`}</Button>}
            >
              <input placeholder="填写验证码" onChange={this.onVerity.bind(this)} className={styles.custInput} />
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
              onClick={this.onRegister.bind(this)}
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