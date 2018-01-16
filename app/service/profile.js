'use strict';

const Service = require('egg').Service;


class ProfileService extends Service {
  async save(req) {
    let result = null;
    const reqProfile = req.profile;

    const profile = await this.app.mysql.get('profile', { user_id: req.user_id });
    if (profile === null) {
      reqProfile.status = 0;
      reqProfile.date_created = new Date().toLocaleString();
      result = await this.app.mysql.insert('profile', reqProfile);
    } else {
      profile.name = reqProfile.name;
      profile.gender = reqProfile.gender;
      profile.card_no = reqProfile.card_no;
      profile.card_front = reqProfile.card_front;
      profile.card_back = reqProfile.card_back;
      profile.card_hold = reqProfile.card_hold;
      profile.self_photo = reqProfile.self_photo;
      profile.address = reqProfile.address;
      profile.contact = reqProfile.contact;
      profile.tel = reqProfile.tel;
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
