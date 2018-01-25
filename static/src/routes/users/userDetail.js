import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import UserView from "./UserView";
import ContactList from "./ContactList";
import { routerRedux } from "dva/router";

import { message, Tabs } from "antd";
import { attachmentURL } from "../../utils/config";

const TabPane = Tabs.TabPane;

const Const = {
	module: "users"
};

class UserDetail extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		const id = this.props.match.params && this.props.match.params.id;
		const { dispatch } = this.props;
		if (id) {
			dispatch({ type: "userDetail/loadProfile", payload: { id, ...Const } });
		}
	}

	componentWillUnmount() {
		// this.props.dispatch({
		// 	type: "tableForm/resetState"
		// });
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/users" }));
	}

	onPass(profileId) {
		const hide = message.loading("正在提交...", 0);
		
		this.props.dispatch({
			type: "userDetail/passAudit",
			payload: {
				id: profileId,
				callback: data => {
					hide();

					if (data && data.success) {
						message.success("提交成功");
						this.goBack();
					} else {
						message.error("提交失败");
					}
				}
			}
		});
	}
	
	onSubmit(values) {
		const hide = message.loading("正在保存...", 0);

		this.props.dispatch({
			type: "tableForm/saveTable",
			payload: {
				...this.props,
				template: values.template,
				cont: values.cont,
				template_name: values.template_name,
				status: values.status,
				time: values.time,
				...Const,
				callback: data => {
					hide();

					if (data && data.success) {
						message.success("保存成功");
						this.goBack();
					} else {
						message.error("保存失败");
					}
				}
			}
		});
	}

	render() {
		const props = this.props;
		console.log(props)
		const profile = {
			id: props.id,
			user_id: props.user_id,
			name: props.name,
			gender: props.gender,
			cardNo: props.card_no,
			cardFront: props.card_front,
			cardBack: props.card_back,
			cardHold: props.card_hold,
			protocols: props.protocols || [],
			address: props.address,
			contact: props.contact,
			tel: props.tel,
			status: props.status,
			refuse: props.refuse,
			contactList: props.contactList,
		}
		console.log(profile.contactList)
		return (
			<Tabs defaultActiveKey="1">
				<TabPane tab="基本信息" key="1">
					<UserView
						profile={profile}
						onSubmit={this.onSubmit.bind(this)}
						onPass={this.onPass.bind(this)}
					/>
				</TabPane>
				<TabPane tab="通信录" key="2">
					<ContactList userId={profile.user_id} />
				</TabPane>
			</Tabs>
		);
	}
}

export default connect(({ userDetail, app }) => {
	return {
		...userDetail,
		// content: userDetail.con,
		// uid: app.user.uid,
		// name: app.user.name
	};
})(UserDetail);
