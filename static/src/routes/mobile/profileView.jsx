import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { List, InputItem, WhiteSpace, NavBar, Icon, Button, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from "./profile.less";
import { request } from "../../utils";
const Item = List.Item;

class ProfileView extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
		this.state = {
			isEditable: false,
			profile: {
				id: null,
				user_id: null,
				name: '',
				gender: 1,
				card_no: '',
				card_front: '',
				card_back: '',
				card_hold: '',
				self_photo: '',
				protocol: '',
				province: null,
				city: null,
				county: null,
				address: '',
				contact: '',
				tel: '',
				status: 1,
				refuse: null,
				date_created: '',
				date_modify: '',
				protocols: []
			},
		}
	}

	componentDidMount() {
		const { loginUserId } = this.props;
		this.loadProfile(loginUserId)
	}

	componentWillReceiveProps(nextProps, nextState) {
		const { profile: detail } = nextProps;
		const sessionProfile = window.sessionStorage.getItem('PROFILE');
		if (sessionProfile !== null) {
			const sProfile = JSON.parse(sessionProfile);
			const sProtocol = window.sessionStorage.getItem('PROTOCOL');
			sProfile.protocols = sProtocol.split(',');
			this.setState({
				profile: Object.assign({}, sProfile),
				isEditable: true
			});
			window.sessionStorage.removeItem('PROFILE');
			window.sessionStorage.removeItem('PROTOCOL');
		} else {
			this.setState({
				profile: Object.assign({}, detail)
			});
		}
	}

	loadProfile(userId) {
		this.props.dispatch({
			type: "profile/detail",
			payload: { userId }
		});
	}

	onRightClick() {
		const { isEditable } = this.state;
		this.setState({ isEditable: !isEditable });
	}

	onBack() {
		this.props.dispatch(routerRedux.replace({ pathname: `/profile` }));
	}

	async	onChange(file, fieldName) {
		const result = await request({
			url: "/api/attachment/upload",
			method: "upload",
			data: {
				file: file
			}
		});
		const { profile: detail } = this.state;
		detail[fieldName] = result.url;
		this.setState({ profile: detail });
	}

	onItemChange(v, fieldName) {
		const { profile: detail } = this.state;
		detail[fieldName] = v;
		this.setState({ profile: detail });
	}

	async onSave() {
		const { profile } = this.state;
		if (profile.protocols.length) {
			profile.protocol = profile.protocols.join(',');
		}
		if (!profile.name) {
			Toast.info('请输入姓名');
			return;
		}
		if (!profile.card_no) {
			Toast.info('请输入身份证号码');
			return;
		}

		if (!profile.card_front) {
			Toast.info('请上传身份证正面照');
			return;
		}
		if (!profile.card_back) {
			Toast.info('请上传身份证背面照');
			return;
		}
		if (!profile.card_hold) {
			Toast.info('请上传手持身份证照片');
			return;
		}
		if (!profile.contact) {
			Toast.info('请输入联系人姓名');
			return;
		}
		if (!profile.address) {
			Toast.info('请输入家庭住址');
			return;
		}
		if (!profile.tel) {
			Toast.info('请输入联系人电话');
			return;
		}
		if (!profile.protocols.length) {
			Toast.info('请上传用户协议');
			return;
		}
		const { loginUserId } = this.props;
		profile.user_id = loginUserId;
		const rsp = await request({
			url: "/api/profile/save",
			method: "POST",
			data: profile
		});
		let result = rsp;
		if (rsp.response) {
			result = rsp.response.data;
		}
		if (!result.success) {
			Toast.info(result.message || '保存失败');
			return;
		}
		Toast.info(profile.status !== 1 ? '保存成功, 请等待审核' : '保存成功', 1, () => {
			this.onBack();
		}, true)
	}
	onCancel() {
		const { profile: detail } = this.props;
		this.setState({
			profile: Object.assign({}, detail),
			isEditable: false,
		});
	}

	onProtocal() {
		const { profile, isEditable } = this.state;
		const protocols = profile.protocols || [];
		window.sessionStorage.setItem('PROTOCOL', protocols.join(','));
		if (isEditable) {
			window.sessionStorage.setItem('PROFILE', JSON.stringify(profile));
		} else {
			window.sessionStorage.removeItem('PROFILE');
		}

		this.props.dispatch(routerRedux.replace({ pathname: `/profile/detail/${profile.user_id}/protocol` }));
	}

	render() {
		const { getFieldProps } = this.props.form;
		const { isEditable, profile } = this.state;
		const status = profile.status || 0;
		const arrow = isEditable && status !== 1 ? 'horizontal' : 'empty';
		return (
			<div className="profile">
				<NavBar
					mode="dark"
					icon={<Icon type='left' />}
					onLeftClick={this.onBack.bind(this)}
					rightContent={!isEditable ? [
						<a key="0" onClick={this.onRightClick.bind(this)}>编辑</a>,
					] : null}
				>我的资料</NavBar>
				<List>
					<InputItem
						{...getFieldProps('name')}
						placeholder='姓名'
						value={profile.name}
						editable={isEditable}
						onChange={(e) => { this.onItemChange.bind(this)(e, 'name') }}
					>真实姓名</InputItem>
					<Item>
						<div className={styles.custLabel}>性别</div>
						<div>
							<input
								name="radio1"
								type="radio"
								id="radio_man"
								checked={profile.gender === 1}
								disabled={!isEditable}
								onChange={() => { this.onItemChange.bind(this)(1, 'gender') }}
								value="1"
							/>
							<label htmlFor="radio_man" className={styles.radioLabel}>男</label>
							<input
								name="radio1"
								type="radio"
								className={styles.ml20}
								id="radio_woman"
								checked={profile.gender === 0}
								disabled={!isEditable}
								onChange={() => { this.onItemChange.bind(this)(0, 'gender') }}
								value="0"
							/>
							<label htmlFor="radio_woman" className={styles.radioLabel}>女</label>
						</div>
					</Item>
					<InputItem
						{...getFieldProps('card_no')}
						placeholder='身份证号'
						value={profile.card_no}
						editable={isEditable && status !== 1}
						onChange={(e) => { this.onItemChange.bind(this)(e, 'card_no') }}
					>身份证号</InputItem>
					<Item
						extra={
							<div className={styles.imgWrap}>
								<img src={profile.card_front} />
								{isEditable && status !== 1 ? <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={(e) => { this.onChange.bind(this)(e.target.files[0], 'card_front') }} /> : null}
							</div>
						}
						arrow={arrow}
					>
						身份证正面
					</Item>
					<Item
						extra={
							<div className={styles.imgWrap}>
								<img src={profile.card_back} />
								{isEditable && status !== 1 ? <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={(e) => { this.onChange.bind(this)(e.target.files[0], 'card_back') }} /> : null}
							</div>
						}
						arrow={arrow}
					>
						身份证背面
					</Item>
					<Item
						extra={
							<div className={styles.imgWrap}>
								<img src={profile.card_hold} />
								{isEditable && status !== 1 ? <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={(e) => { this.onChange.bind(this)(e.target.files[0], 'card_hold') }} /> : null}
							</div>
						}
						arrow={arrow}
					>
						手持身份证
					</Item>
					<Item
						extra={
							<div className={styles.imgWrap}>
								<img src={profile.self_photo} />
								{isEditable ? <input type="file" accept="image/jpeg,image/jpg,image/png" onChange={(e) => { this.onChange.bind(this)(e.target.files[0], 'self_photo') }} /> : null}
							</div>
						}
						arrow={`${isEditable ? 'horizontal' : 'empty'}`}
					>
						头像
					</Item>
					<Item
						extra={`${profile.protocols.length}张`}
						arrow='horizontal'
						onClick={this.onProtocal.bind(this)}
					>
						用户协议
					</Item>
					<InputItem
						editable={isEditable}
						{...getFieldProps('address')}
						placeholder='家庭住址'
						value={profile.address}
						onChange={(e) => { this.onItemChange.bind(this)(e, 'address') }}
					>家庭住址</InputItem>
					<InputItem
						editable={isEditable}
						{...getFieldProps('contact')}
						placeholder='联系人'
						value={profile.contact}
						onChange={(e) => { this.onItemChange.bind(this)(e, 'contact') }}
					>联系人</InputItem>
					<InputItem
						editable={isEditable}
						{...getFieldProps('tel')}
						placeholder='联系人电话'
						value={profile.tel}
						onChange={(e) => { this.onItemChange.bind(this)(e, 'tel') }}
					>联系人电话</InputItem>
				</List>
				{isEditable ? <div className={styles.listBottom}>
					<Button
						type='primary'
						className={styles.listBottomLeft}
						onClick={this.onSave.bind(this)}
					>保存</Button>
					<Button
						className={styles.listBottomRight}
						onClick={this.onCancel.bind(this)}
					>取消</Button>
				</div> : null}
			</div>
		);
	}
}

export default connect(({ login, profile }) => {
	return {
		loginUserId: login.id,
		profile: profile.detail
	};
})(createForm()(ProfileView));