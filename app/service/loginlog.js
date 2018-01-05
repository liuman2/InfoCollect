'use strict';

const Service = require('egg').Service;

class LoginlogService extends Service {
  async log(req) {
    const log = {
      user_id: req.user_id,
      os: req.os,
      date_created: new Date().toLocaleString(),
    };

    const position = req.position;
    if (position) {
      log.country = position.country;
      log.province = position.province;
      log.city = position.city;
      log.district = position.district;
      log.street = position.street;
      log.street_num = position.street_num;
      log.address = position.address;
      log.latitude = position.latitude;
      log.longitude = position.longitude;
      log.altitude = position.altitude;
    }

    this.app.mysql.insert('login_log', log);
  }
}

module.exports = LoginlogService;
