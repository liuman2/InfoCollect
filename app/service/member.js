'use strict';

const Service = require('egg').Service;
const Crypto = require('crypto');

class MemberService extends Service {
  async login(request) {
    const condition = { name: request.username };
    const record = await this.app.mysql.get('admin', condition);

    if (!record) {
      return {
        success: false,
        message: '用户不存在',
        data: null,
      };
    }

    const md5 = Crypto.createHash('md5');
    const saltPassword = `${request.password}:${record.salt}`;
    const str = md5.update(saltPassword).digest('hex');
    if (str !== record.password) {
      return {
        success: false,
        message: '密码不正确',
        data: null,
      };
    }

    const { id, name, date_created } = record;
    return {
      success: true,
      message: null,
      user: {
        id,
        name,
        date_created,
      },
    };
  }
}

module.exports = MemberService;