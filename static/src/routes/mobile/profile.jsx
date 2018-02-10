import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { NavBar, Icon, Button } from 'antd-mobile';
import styles from "./profile.less";

class Profile extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		const { loginUserId } = this.props;
		this.loadProfile(loginUserId);
	}

	loadProfile(userId) {
		this.props.dispatch({
			type: "profile/getProfileInfo",
			payload: { userId }
		});
	}

	onDetail() {
		const { profile } = this.props;
		this.props.dispatch(routerRedux.replace({ pathname: `/profile/detail/${profile.user_id}` }));
	}

	render() {
		const { profile } = this.props;
		const status = ['审核中', '已审核', '未通过']
		return (
			<div>
				<NavBar
					mode="dark"
				// icon={<Icon type="left" />}
				// onLeftClick={() => console.log('onLeftClick')}
				// rightContent={[
				// 	<Icon key="0" type="search" style={{ marginRight: '16px' }} />,
				// 	<Icon key="1" type="ellipsis" />,
				// ]}
				>乐惠享</NavBar>
				<div className="profile">
					<div className="avatar">
						<img className="profile-face" src={profile.self_photo} />
					</div>
					<div className="profile-message">
						<div>
							<span>欢迎您，{profile.name}</span>
						</div>
						<div>
							<span className="mr10">您当前的状态为</span>
							<span className="green">{status[profile.status]}</span>
						</div>
						<div>
							<Button className={styles.btnView} onClick={this.onDetail.bind(this)}>查看我的资料</Button>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default connect(({ lxhApp, profile }) => {
	return {
		loginUserId: lxhApp.loginUser.id,
		profileIsFull: lxhApp.loginUser.profileIsFull,
		profile: profile.info
	};
})(Profile);
