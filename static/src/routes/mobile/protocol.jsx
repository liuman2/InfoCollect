import React, { Component, PropTypes } from "react";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { ImagePicker, Toast, NavBar, Icon } from 'antd-mobile';
import { request } from "../../utils";

class Protocal extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      files: []
    }
  }

  componentDidMount() {
    const { loginUserId } = this.props;
    const protocol = window.sessionStorage.getItem('PROTOCOL');
    if (protocol !== null && protocol !== undefined && protocol !== '') {
      const urls = protocol.split(',');
      let arr = [];
      urls.forEach(l => {
        arr.push({
          url: l
        })
      });
      this.setState({
        files: arr
      })
    }
  }

  onBack() {
    const { loginUserId } = this.props;
    const { files } = this.state;
    let arr = [];
    if (files.length) {
      files.forEach(l => {
        arr.push(l.url);
      });
    }

    window.sessionStorage.setItem('PROTOCOL', arr.join(','));
    this.props.dispatch(routerRedux.replace({ pathname: `/profile/detail/${loginUserId}` }));
  }

  async onChange(files, type, index) {
    if (type === 'remove') {
      this.setState({
        files,
      });
      return
    }
    if (type === 'add') {
      const result = await request({
        url: "/api/attachment/upload",
        method: "upload",
        data: {
          file: files[files.length - 1].file
        }
      });
      files[files.length - 1].url = result.url;
      this.setState({
        files,
      });
    }
  }

  render() {
    const { files } = this.state;
    const profile = window.sessionStorage.getItem('PROFILE');
    const selectable = profile !== null;
    return (
      <div className="profile">
        <NavBar
          mode="dark"
          icon={<Icon type='left' />}
          onLeftClick={this.onBack.bind(this)}
        >用户协议</NavBar>
        <ImagePicker
          files={files}
          onChange={this.onChange.bind(this)}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 20}
          accept='image/jpeg,image/jpg,image/png'
          selectable={selectable}
        />
      </div>
    );
  }
}

export default connect(({ login }) => {
  return {
    loginUserId: login.id
  };
})(Protocal);