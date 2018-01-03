'use strict';

const http = require('http');
const Service = require('egg').Service;

class SmsService extends Service {
  async sendSms(request) {
    const smsRoot = 'http://api.sms.cn/sms/';
    const pwd = '21a4dc623cfd0b301611c2bf7886437d';

    const verifyCode = Math.random().toString().slice(2, 8);
    const content = encodeURIComponent(`您的验证码：${verifyCode}。如非本人操作，可不用理会！【乐享惠 】`);
    const params = `?ac=send&uid=zps840904&pwd=${pwd}&mobile=${request.mobile}&content=${content}`;
    const url = `${smsRoot}${params}`;

    await http.get(url);
    const types = {
      register: 0,
      retrieve: 1,
    };

    const result = await this.app.mysql.insert('sms', {
      mobile: request.mobile,
      code: verifyCode,
      type: types[request.type],
      date_created: new Date().toLocaleString(),
    });

    return {
      success: result.affectedRows === 1,
    };
  }

  async checkVerifyCode(mobileNo, verify, typeNo) {
    const results = await this.app.mysql.select('sms', {
      where: { mobile: mobileNo, type: typeNo },
      columns: [ 'code' ],
      orders: [[ 'id', 'desc' ]],
      limit: 1, // 返回数据量
    });

    if (!results || !results.length) {
      return false;
    }

    const code = results[0].code;
    return code === verify;
  }
}

module.exports = SmsService;
