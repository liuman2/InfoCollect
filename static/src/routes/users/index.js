import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Badge, Switch } from "antd";
import { DropOption } from "../../components";
import moment from "moment";
import { routerRedux } from "dva/router";

const statusMap = ['processing', 'success', 'error'];
const status = ['未审核', '通过', '不通过'];
const gender = ['女', '男'];

const columns = [
	// { title: '序号', dataIndex: 'id' },
	{ title: '名字', dataIndex: 'name' },
	{
		title: '性别', dataIndex: 'gender',
		filters: [
			{
				text: gender[0],
				value: 0,
			},
			{
				text: gender[1],
				value: 1,
			},
		],
		render(val) {
			return gender[val];
		},
	},
	{ title: '身份证', dataIndex: 'card_no' },
	{ title: '地址', dataIndex: 'address' },
	{ title: '联系人', dataIndex: 'contact' },
	{ title: '联系人电话', dataIndex: 'tel' },
	{
		title: '状态',
		dataIndex: 'status',
		filters: [
			{
				text: status[0],
				value: 0,
			},
			{
				text: status[1],
				value: 1,
			},
			{
				text: status[2],
				value: 2,
			},
		],
		render(val) {
			return <Badge status={statusMap[val]} text={status[val]} />;
		},
	},
	{
		title: '日期',
		dataIndex: 'date_created',
		render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
	},
	{
		title: '操作',
		key: 'operation',
		width: 100,
	}
];

const linkStyle = {
	display: "inline-block",
	padding: "0 10px",
	cursor: "pointer"
};

class Users extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);

		const len = columns.length;

		columns[len - 1].render = (text, record, index) => {
			return (
				<div>
					<span
						onClick={this.toUserDetail.bind(this, record.id)}
						style={linkStyle}
					>
						详情
					</span>
				</div>
			);
		};
	}	

	componentDidMount() {
		this.loadUserData();
	}

	toUserDetail(profileId) {
		this.props.dispatch(
			routerRedux.push({ pathname: `/users/detail/${profileId}` })
		);
	}

	toContactList(userId) {
		this.props.dispatch(
			routerRedux.push({ pathname: `/contact/list/${userId}` })
		);
	}

	loadUserData(page = 1, pageSize = 10) {
		this.props.dispatch({
			type: "users/loadUsers",
			payload: { page, pageSize }
		});
	}

	userChange(pagination) {
		this.loadUserData(pagination.current, pagination.pageSize);
	}

	selectRow(selectedRowKeys) {
		this.props.dispatch({
			type: "tableManager/selectedRowKeys",
			payload: { selectedRowKeys }
		});
	}
	
	changeTableManagerState(record) {
		console.log("switchChange", record);
		const status = record.status ? 0 : 1;
		this.props.dispatch({
			type: "tableManager/updateTableManager",
			payload: {
				...record,
				status,
				page: this.props.pagination.current,
				pageSize: this.props.pagination.pageSize
			}
		});
	}

	deleteTableManager() {
		if (this.props.selectedRowKeys.length > 0) {
			Modal.confirm({
				title: "确定要删除所选数据?",
				content: "点击确定，数据则被删除",
				onOk: () => {
					let templateArr = [];
					this.props.list.forEach((v, index) => {
						if (this.props.selectedRowKeys.indexOf(v.id) !== -1) {
							templateArr.push(v.template);
						}
					});
					this.props.dispatch({
						type: "tableManager/removeTableManager",
						payload: {
							selectedRowKeys: this.props.selectedRowKeys,
							templateArr
						}
					});
				}
			});
		} else {
			Modal.warning({
				title: "未选中任何数据",
				content: "请选择要删除的数据"
			});
		}
	}

	render() {
		const rowSelection = {
			selectedRowKeys: this.props.selectedRowKeys,
			onChange: this.selectRow.bind(this)
		};

		const pagination = {
			showTotal: total => `共${total}条数据`,
			showSizeChanger: true,
			showQuickJumper: true,
			...this.props.pagination
		};

		return (
			<div className="content-inner">
				{/* <div
					style={{
						paddingBottom: 10,
						marginBottom: 20,
						borderBottom: "1px solid #ddd"
					}}
				>
					<Button
						onClick={this.toTableManagerForm.bind(this, 0)}
						style={{ marginRight: 10 }}
					>
						新增
					</Button>
					<Button onClick={this.deleteTableManager.bind(this)}>删除</Button>
				</div> */}

				<Table
					columns={columns}
					rowSelection={rowSelection}
					pagination={pagination}
					dataSource={this.props.list}
					rowKey="id"
					loading={this.props.loading}
					bordered
					onChange={this.userChange.bind(this)}
				/>
			</div>
		);
	}
}

export default connect(({ users }) => {
	return {
		list: users.list,
		loading: users.loading,
		total: users.total,
		selectedRowKeys: users.selectedRowKeys,
		pagination: users.pagination
	};
})(Users);
