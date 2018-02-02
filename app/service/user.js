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
    params.status = 0;
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

  async search(query) {
    app.mysql.query('select id, user_id, name, gender, card_no, address, contact, tel, status, date_created where name like ?', [`%${query.keyword}%`]);

    const results = await this.app.mysql.select('profile', { // 搜索 post 表
      // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
      columns: ['id', 'user_id', 'name', 'gender', 'card_no', 'address', 'contact', 'tel', 'status', 'date_created'],  // 要查询的表字段
      orders: [['date_modify','desc'], ['id','desc']], // 排序方式
      limit: query.pageSize, // 返回数据量
      offset: query.page - 1, // 数据偏移量
    });

    const count = await this.app.mysql.count('profile', {
      // where: { status: 'draft', author: ['author1', 'author2'] }, // WHERE 条件
    });

    return {
      record: results,
      totalRecord:count || 0,
    }

  }
}

module.exports = UserService;
