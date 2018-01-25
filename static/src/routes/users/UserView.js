import React, { Component, PropTypes } from "react";
import {
	Input,
	Button,
	Modal,
	message,
} from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import config from "../../utils/config";

const { TextArea } = Input;

class UserView extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	static defaultProps = {
		id: '',
	};

	constructor(props) {
    super(props);
    this.state = { 
			visible: false,
			refuse: '',
		};
  }	

	showModal = () => {
    this.setState({
      visible: true,
    });
  }

	onPass(e) {
		e.preventDefault();
		const { profile } = this.props;
		this.props.onPass(profile.id);
	}
	
	handleOk = (e) => {
    if(!this.state.refuse) {
			message.warning('请填写拒绝理由');
			return;
		}
		const { dispatch, profile } = this.props;
		dispatch({ type: "userDetail/refuseAudit", payload: {
			id: profile.id,
			refuse: this.state.refuse,
		} });

    this.setState({
      visible: false,
    });
	}
	
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
	}
	
	onSubmit(e) {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (err) {
				return;
			}
			values.time = Date.parse(new Date()) / 1000;
			this.props.onSubmit(values);
		});
	}

	goBack() {
		this.props.dispatch(routerRedux.push({ pathname: "/users" }));
	}

	onChange = (e) => {		
		this.setState({ refuse: e.target.value });
		console.log(this.state.refuse)
	}	
	
	render() {
		const { profile } = this.props;
		const status = ['未审核', '审核通过', '审核不通过'];
		const color = ['#108ee9', '#00a854', '#f04134'];
		const clsSpan = { width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px' };
		const clsMb15 = { marginBottom: '15px' };

		return (
			<div className="content-inner">
				<div
					style={{
						borderBottom: "1px solid #ddd",
						marginBottom: 20,
						paddingBottom: 10
					}}
				>
					<Button style={{ marginRight: 10 }} onClick={this.goBack.bind(this)}>
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

				<div>
					<div style={clsMb15}>
						<span style={clsSpan}>姓名：</span>
						<span>{profile.name}</span>
					</div>
					<div style={clsMb15}>
						<span style={clsSpan}>状态：</span>
						<span style={{color: color[profile.status]}}>{status[profile.status]}</span>
					</div>
					{
						(() => {
							if (profile.status === 2) {
								return (
									<div style={clsMb15}>
										<span style={clsSpan}>拒绝理由：</span>
										<span>{profile.refuse}</span>
									</div>
								);
							}
							return null;
						})()
					}
					<div style={clsMb15}>
						<span style={clsSpan}>性别：</span>
						<span>{profile.gender === 1 ? '男' : '女'}</span>
					</div>
					<div style={clsMb15}>
						<span style={clsSpan}>身份证：</span>
						<span>{profile.cardNo}</span>
					</div>

					<div style={clsMb15}>
						<span style={clsSpan}>地址：</span>
						<span>{profile.address}</span>
					</div>
					<div style={clsMb15}>
						<span style={clsSpan}>联系人：</span>
						<span>{profile.contact}</span>
					</div>
					<div style={clsMb15}>
						<span style={clsSpan}>联系电话：</span>
						<span>{profile.tel}</span>
					</div>
					<div style={clsMb15}>
						<span style={{ width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px', verticalAlign: 'top' }}>身份证正面：</span>
						<a href={profile.cardFront} target='_blank'>
							<img src={profile.cardFront} style={{ width: '100px' }} />
						</a>
					</div>
					<div style={clsMb15}>
						<span style={{ width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px', verticalAlign: 'top' }}>身份证背面：</span>
						<a href={profile.cardBack} target='_blank'>
							<img src={profile.cardBack} style={{ width: '100px' }} />
						</a>
					</div>
					<div style={clsMb15}>
						<span style={{ width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px', verticalAlign: 'top' }}>手持照：</span>
						<a href={profile.cardHold} target='_blank'>
							<img src={profile.cardHold} style={{ width: '100px' }} />
						</a>
					</div>

					<div style={clsMb15}>
						<span style={{ width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px', verticalAlign: 'top' }}>协议：</span>
						{
							profile.protocols.map((item, index) => {
								return (
									<a href={item} target='_blank' style={{ marginRight: '5px' }} key={index}>
										<img src={item} style={{ width: '100px' }} />
									</a>
								);
							})
						}
					</div>

				</div>

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

export default connect(({ users }) => {
	return {};
})(UserView);
