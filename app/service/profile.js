'use strict';

const Service = require('egg').Service;


class ProfileService extends Service {
  async save(req) {
    let result = null;
    const profile = await this.app.mysql.get('profile', { user_id: req.user_id });
    if (profile === null) {
      req.status = 0;
      req.date_created = new Date().toLocaleString();
      result = await this.app.mysql.insert('profile', req);
    } else {
      profile.name = req.name;
      profile.gender = req.gender;
      profile.card_no = req.card_no;
      profile.card_front = req.card_front;
      profile.card_back = req.card_back;
      profile.card_hold = req.card_hold;
      profile.self_photo = req.self_photo;
      profile.address = req.address;
      profile.contact = req.contact;
      profile.tel = req.tel;
      profile.province = null;
      profile.city = null;
      profile.county = null;
      profile.date_modify = new Date().toLocaleString();

      result = await this.app.mysql.update('profile', profile);
    }

    // 判断更新成功
    return {
      success: result.affectedRows === 1,
      message: '',
    };
  }

  async find(uid) {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const profile = await this.app.mysql.get('profile', { user_id: uid });
    return profile;
  }

  async checkFull(uid) {
    const profile = await this.app.mysql.get('profile', { user_id: uid });
    if (profile === null) {
      return false;
    }

    return !!(profile.name && profile.gender !== null && profile.card_no && profile.card_front && profile.card_back &&
    profile.card_hold && profile.self_photo && profile.address && profile.contact && profile.tel);
  }
}

module.exports = ProfileService;
