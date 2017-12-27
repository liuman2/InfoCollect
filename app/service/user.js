'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  // 注册用户
  async register(params) {
    console.log(params)
    return 1;
  }
  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const user = await this.app.mysql.get('user', { id: 11 });
    return { user };
  }
}

module.exports = UserService;
