import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { NavBar, Icon, Button } from 'antd-mobile';
import { config } from "../../utils";
import styles from "./profile.less";

class Profile extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		const { loginUserId, profileIsFull } = this.props;
		if (!loginUserId) {
			this.props.dispatch(routerRedux.replace({ pathname: '/login' }));
		}
		if (profileIsFull) {
			this.loadProfile(loginUserId);
		}
	}

	loadProfile(userId) {
		this.props.dispatch({
			type: "profile/getProfileInfo",
			payload: { userId }
		});
	}

	onDetail() {
		const { loginUserId } = this.props;
		this.props.dispatch(routerRedux.replace({ pathname: `/profile/detail/${loginUserId}` }));
	}

	onEdit() {
		const { loginUserId } = this.props;
		this.props.dispatch(routerRedux.replace({
			pathname: `/profile/detail/${loginUserId}`
		}));
	}

	render() {
		const { profile, profileIsFull } = this.props;
		const status = ['审核中', '已审核', '未通过'];
		return (
			<div>
				<NavBar
					mode="dark"
				>乐惠享</NavBar>
				<div className="profile">
					<div className="avatar">
						<img className="profile-face" src={profile.self_photo || config.head} />
					</div>
					{profileIsFull ? <div className="profile-message">
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
					</div> : null}
					{!profileIsFull ? <div className="profile-message">
						<p>您还没完善资料，请填写完整资料</p>
						<Button type="primary" className={styles.liBtn} onClick={this.onEdit.bind(this)}>立即完善</Button>
					</div> : null}
				</div>
			</div>

		);
	}
}

export default connect(({ profile, login }) => {
	let loginUserId = login ? login.id : '';
	let profileIsFull = login ? login.profileIsFull : false;
	return {
		loginUserId: loginUserId,
		profileIsFull: profileIsFull,
		profile: profile.info
	};
})(Profile);
