'use strict';

const Service = require('egg').Service;


class ProfileService extends Service {
  async save(req) {
    let result = null;
    const profile = await this.app.mysql.get('profile', { user_id: req.user_id });
    if (profile === null) {
      req.status = 0;
      req.date_created = new Date().toLocaleString();
      result = await this.app.mysql.insert('uprofileer', req);
    } else {
      
    }
  }

  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const profile = await this.app.mysql.get('profile', { user_id: uid });
    return profile;
  }
}

module.exports = ProfileService;
