import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Form, Row, Col, Input } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";

const FormItem = Form.Item;

const columns = [
  {
		title: '登录时间',
		dataIndex: 'date_created',
		render: val => val ? <span>{moment(val).format('YYYY-MM-DD HH:mm')}</span> : '',
	},
	{ title: '经度', dataIndex: 'longitude' },
	{ title: '纬度', dataIndex: 'latitude' },
	{ title: '登录平台', dataIndex: 'os' },
];

const linkStyle = {
	display: "inline-block",
	padding: "0 10px",
	cursor: "pointer"
};

class LoginLog extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.loadLoginLogData();
	}

	loadLoginLogData(page = 1, pageSize = 20) {
		const userId = this.props.userId;

		this.props.dispatch({
			type: "userDetail/loadLoginLog",
			payload: { userId, page, pageSize }
		});
	}

	pageChange(pagination) {
		this.loadLoginLogData(pagination.current, pagination.pageSize);
	}

	render() {
		const pagination = {
			showTotal: total => `共${total}条数据`,
			showSizeChanger: true,
			showQuickJumper: true,
			...this.props.pagination
		};

		const { loginLogList } = this.props;

		return (
			<div className="content-inner">
				<Table
					columns={columns}
					pagination={pagination}
					dataSource={loginLogList}
					rowKey="id"
					loading={this.props.loading}
					bordered
					onChange={this.pageChange.bind(this)}
				/>
			</div>
		);
	}
}

export default connect(({ userDetail }) => {
	return {
		loginLogList: userDetail.loginLogList,
		loading: userDetail.loading,
		total: userDetail.total,
		selectedRowKeys: userDetail.selectedRowKeys,
		pagination: userDetail.logPagination
	};
})(LoginLog);
