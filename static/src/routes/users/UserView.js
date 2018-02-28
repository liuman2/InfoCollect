import React, { Component, PropTypes } from "react";
import moment from "moment";
import { routerRedux } from "dva/router";
import LightBox from 'react-image-lightbox';
import { connect } from "dva";
import config from "../../utils/config";

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
      photoIndex: 0,
      isOpen: false,
    };
	}

	render() {
		const { profile } = this.props;
		const status = ['未审核', '审核通过', '审核不通过'];
		const color = ['#108ee9', '#00a854', '#f04134'];
		const clsSpan = { width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px' };
		const clsMb15 = { marginBottom: '15px' };
		const { isOpen, photoIndex } = this.state;

		const imgs = [];
		imgs.push(profile.cardFront);
		imgs.push(profile.cardBack);
		imgs.push(profile.cardHold);
		const images = imgs.concat(profile.protocols);

		return (
			<div className="content-inner">
				<div>
					<div style={clsMb15}>
						<span style={clsSpan}>姓名：</span>
						<span>{profile.name}</span>
					</div>
					<div style={clsMb15}>
						<span style={clsSpan}>状态：</span>
						<span style={{ color: color[profile.status] }}>{status[profile.status]}</span>
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
						<a href='javascript:;' onClick={() =>
              this.setState({
								isOpen: true,
								photoIndex: 0,
              })
            }>
							<img src={profile.cardFront} style={{ width: '100px' }} />
						</a>
					</div>
					<div style={clsMb15}>
						<span style={{ width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px', verticalAlign: 'top' }}>身份证背面：</span>
						<a href='javascript:;' onClick={() =>
              this.setState({
								isOpen: true,
								photoIndex: 1,
              })
            }>
							<img src={profile.cardBack} style={{ width: '100px' }} />
						</a>
					</div>
					<div style={clsMb15}>
						<span style={{ width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px', verticalAlign: 'top' }}>手持照：</span>
						<a href='javascript:;' onClick={() =>
              this.setState({
								isOpen: true,
								photoIndex: 2,
              })
            }>
							<img src={profile.cardHold} style={{ width: '100px' }} />
						</a>
					</div>

					<div style={clsMb15}>
						<span style={{ width: '78px', display: 'inline-block', textAlign: 'right', marginRight: '10px', verticalAlign: 'top' }}>协议：</span>
						{
							profile.protocols.map((item, index) => {
								return (
									<a href='javascript:;' style={{ marginRight: '5px' }} key={index} onClick={() =>
										this.setState({
											isOpen: true,
											photoIndex: 3 + index,
										})
									}>
										<img src={item} style={{ width: '100px' }} />
										{index}
									</a>
								);
							})
						}
					</div>
					{isOpen && <LightBox
						mainSrc={images[photoIndex]}
						onCloseRequest={() => this.setState({ isOpen: false })}
						nextSrc={images[(photoIndex + 1) % images.length]}
						prevSrc={images[(photoIndex + images.length - 1) % images.length]}
						onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length
              })}
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length
              })}
					/>}
				</div>
			</div>
		);
	}
}

export default connect(({ users }) => {
	return {};
})(UserView);
