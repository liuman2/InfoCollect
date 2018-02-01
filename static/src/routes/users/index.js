import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { Table, Button, Modal, Badge, Switch, Row, Col, Form, Icon, Input } from "antd";
import { DropOption } from "../../components";
import moment from "moment";
import { routerRedux } from "dva/router";

const FormItem = Form.Item;
const statusMap = ['processing', 'success', 'error'];
const status = ['未审核', '通过', '不通过'];
const gender = ['女', '男'];

const columns = [
	// { title: '序号', dataIndex: 'id' },
	{ title: '姓名', dataIndex: 'name' },
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

	loadUserData(page = 1, pageSize = 20) {
		this.props.dispatch({
			type: "users/loadUsers",
			payload: { page, pageSize }
		});
	}

	userChange(pagination) {
		this.loadUserData(pagination.current, pagination.pageSize);
	}

	handleSearch (e) {
		e.preventDefault();
		const { dispatch, form } = this.props;
		form.validateFields((err, fieldsValue) => {
      if (err) return;

     console.log(fieldsValue)


    });
	}

	renderForm() {
    // const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Row gutter={{ md: 8, lg: 16, xl: 32 }}>
          <Col md={8} sm={16}>
            <FormItem label="关键字">
							<Input placeholder="姓名或联系电话" />
            </FormItem>
						<span>
              <Button type="primary" onClick={this.handleSearch.bind(this)} >查询</Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

	render() {
		const pagination = {
			showTotal: total => `共${total}条数据`,
			showSizeChanger: true,
			showQuickJumper: true,
			...this.props.pagination
		};

		return (
			<div className="content-inner">
				<div
					style={{
						paddingBottom: 10,
						marginBottom: 20,
						borderBottom: "1px solid #ddd"
					}}
				>
					{this.renderForm()}
				</div>

				<Table
					columns={columns}
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
