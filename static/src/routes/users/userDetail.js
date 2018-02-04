import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import UserView from "./UserView";
import ContactList from "./ContactList";
import LoginLog from "./LoginLog";
import { routerRedux } from "dva/router";
import {
	Input,
	Button,
	Modal,
	message,
	Tabs,
} from "antd";
import { attachmentURL } from "../../utils/config";
const { TextArea } = Input;

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
		this.state = { 
			visible: false,
			refuse: '',
		};
	}

	componentDidMount() {
		const id = this.props.match.params && this.props.match.params.id;
		const { dispatch } = this.props;
		if (id) {
			dispatch({ type: "userDetail/loadProfile", payload: { id, ...Const } });
		}
	}

	showModal = () => {
    this.setState({
      visible: true,
    });
  }

	onChange = (e) => {		
		this.setState({ refuse: e.target.value });
	}	
	
	handleOk = (e) => {
    if(!this.state.refuse) {
			message.warning('请填写拒绝理由');
			return;
		}
		const { dispatch, id } = this.props;
		dispatch({ type: "userDetail/refuseAudit", payload: {
			id: id,
			refuse: this.state.refuse,
		} });

    this.setState({
      visible: false,
    });
	}
	
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/users" }));
	}

	onPass() {
		const hide = message.loading("正在提交...", 0);
		const { id } = this.props;
		this.props.dispatch({
			type: "userDetail/passAudit",
			payload: {
				id: id,
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
			<div>
				<div
					style={{
						borderBottom: "1px solid #ddd",
						marginBottom: 20,
						paddingTop: 10,
						paddingBottom: 10
					}}
				>
					<Button style={{ marginRight: 10, marginLeft: 10 }} onClick={this.goBack.bind(this)}>
						返回
					</Button>
					{
						(() => {
							if (profile.status !== 1) {
								return (
									<div style={{display: 'inline-block'}}>
										<Button style={{ marginRight: 10 }} type="primary" onClick={this.onPass.bind(this)}>
											审核通过
										</Button>
										<Button type="danger" onClick={this.showModal}>
											审核不通过
										</Button>
									</div>
								);
							}
							return null;
						})()
					}
				</div>
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
					<TabPane tab="登录日志" key="3">
						<LoginLog userId={profile.user_id} />
					</TabPane>
				</Tabs>

				<Modal
          title='拒绝理由'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
					<TextArea 
						placeholder="填写审核不通过的原因"
						autosize={{ minRows: 4, maxRows: 6 }}
						onChange={this.onChange}
					/>
        </Modal>
			</div>
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
