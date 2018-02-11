import React, { Component, PropTypes } from "react";
import { routerRedux } from "dva/router";
import {  NavBar, Button, Icon } from 'antd-mobile';
import styles from "./agreement.less";

class Agreement extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {

		}
	}

	componentDidMount() {		
	}

	onDetail() {
		this.props.dispatch(routerRedux.replace({ pathname: `/agreement/detail` }));
	}

	onBack() {
		window.location.href = '#/login';
	}

	render() {
		return (
			<div className="profile">
				<NavBar
					mode="dark"
					icon={<Icon type='left' />}
					onLeftClick={this.onBack.bind(this)}
				>服务协议</NavBar>
				<div className={styles.agreementWrap}>
					<p>亲爱的用户，乐享惠依照相关法规要求进行实名制管理和采取风险防范措施。为了您可以正常使用乐享惠服务，您的身份信息、联系方式、交易信息等需要被依法收集并使用。</p>
					<p>乐享惠将严格保护您的个人信息，确保信息安全，具体详见《乐享惠隐私权政策》。</p>
					<p>您在点击同意前，请您务必审慎阅读，并充分理解以下内容。当您按照注册页面提示填写信息、阅读并点击同意后，即表示您已充分阅读、理解并接受协议的全部内容。</p>
					<div>
						<a className={styles.agreementHref} href='#/agreement/detail'>《乐享惠隐私权政策》</a>
					</div>
				</div>
				<div className={styles.listBottom}>
					<Button
						type='primary'
						className={styles.listBottomLeft}
					>同意</Button>
					<Button
						className={styles.listBottomRight}
						onClick={this.onBack.bind(this)}
					>不同意</Button>
				</div>
			</div>
		);
	}
}

export default Agreement;