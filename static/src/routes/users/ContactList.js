import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button } from "antd";
import moment from "moment";
import { routerRedux } from "dva/router";

const columns = [
	// { title: '序号', dataIndex: 'id' },
	{ title: '编号', dataIndex: 'contact_id' },
	{ title: '姓名', dataIndex: 'name' },
	{ title: '联系电话1', dataIndex: 'phone1' },
	{ title: '联系电话2', dataIndex: 'phone2' },
	{ title: '联系电话3', dataIndex: 'phone3' },
	{ title: '邮件1', dataIndex: 'email1' },
	{ title: '邮件2', dataIndex: 'email2' },
	{ title: '邮件3', dataIndex: 'email3' },
	{ title: '地址1', dataIndex: 'address1' },
	{ title: '地址2', dataIndex: 'address2' },
	{ title: '公司名称', dataIndex: 'organization_name' },
	{ title: '公司职务', dataIndex: 'organization_title' },
	{
		title: '生日',
		dataIndex: 'birthday',
		render: val => val ? <span>{moment(val).format('YYYY-MM-DD')}</span> : '',
	}
];

const linkStyle = {
	display: "inline-block",
	padding: "0 10px",
	cursor: "pointer"
};

class ContactList extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.loadContactData();
	}

	loadContactData(page = 1, pageSize = 20) {
		const userId = this.props.userId;

		this.props.dispatch({
			type: "userDetail/loadContacts",
			payload: { userId, page, pageSize }
		});
	}

	pageChange(pagination) {
		this.loadContactData(pagination.current, pagination.pageSize);
	}

	render() {
		const pagination = {
			showTotal: total => `共${total}条数据`,
			showSizeChanger: true,
			showQuickJumper: true,
			...this.props.pagination
		};

		const { contactList } = this.props;

		return (
			<div className="content-inner">
				<Table
					columns={columns}
					pagination={pagination}
					dataSource={contactList}
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
		contactList: userDetail.contactList,
		loading: userDetail.loading,
		total: userDetail.total,
		selectedRowKeys: userDetail.selectedRowKeys,
		pagination: userDetail.pagination
	};
})(ContactList);
