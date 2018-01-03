'use strict';

const Service = require('egg').Service;
const Crypto = require('crypto');

class UserService extends Service {
  // 注册用户
  async register(params) {
    const md5 = Crypto.createHash('md5');

    const salt = Math.random().toString().slice(2, 5);
    const saltPassword = `${params.password}:${salt}`;
    const str = md5.update(saltPassword).digest('hex');

    params.password = str;
    params.salt = salt;
    params.date_created = new Date().toLocaleString();
    delete params.verify;

    const result = await this.app.mysql.insert('user', params);

    return {
      success: result.affectedRows === 1,
      message: '',
      user: {
        id: result.insertId,
        nick_name: params.nick_name,
        mobile: params.mobile,
      },
    };
  }
  async checkExistByMobile(mobileNo) {
    const user = await this.app.mysql.get('user', { mobile: mobileNo });
    return user !== null;
  }

  async signin(request) {
    const user = await this.app.mysql.get('user', { mobile: request.mobile });
    if (!user) {
      return null;
    }

    const md5 = Crypto.createHash('md5');
    const saltPassword = `${request.password}:${user.salt}`;
    const str = md5.update(saltPassword).digest('hex');
    if (str !== user.password) {
      return null;
    }

    const { id, mobile, nick_name, date_created } = user;
    return {
      id,
      mobile,
      nick_name,
      date_created,
    };
  }

  async resetPassword(request) {
    const user = await this.app.mysql.get('user', { mobile: request.mobile });
    if (!user) {
      return {
        success: false,
        message: '该用户不存在',
      };
    }

    const md5 = Crypto.createHash('md5');
    const saltPassword = `${request.password}:${user.salt}`;
    const str = md5.update(saltPassword).digest('hex');
    user.password = str;

    const result = await this.app.mysql.update('user', user);
    return {
      success: result.affectedRows === 1,
      message: '',
    };
  }

  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('user', { id: uid });
    const { id, mobile, nick_name, date_created } = user;
    return {
      id,
      mobile,
      nick_name,
      date_created,
    };
  }
}

module.exports = UserService;
