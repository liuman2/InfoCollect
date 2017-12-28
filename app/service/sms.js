'use strict';

const http = require('http');
const Service = require('egg').Service;

class SmsService extends Service {
  async sendSms(mobileNo) {
    const smsRoot = 'http://api.sms.cn/sms/';
    const pwd = '21a4dc623cfd0b301611c2bf7886437d';

    const verifyCode = Math.random().toString().slice(2, 8);
    const content = encodeURIComponent(`您的验证码：${verifyCode}。如非本人操作，可不用理会！【乐享惠 】`);
    const params = `?ac=send&uid=zps840904&pwd=${pwd}&mobile=${mobileNo}&content=${content}`;
    const url = `${smsRoot}${params}`;

    await http.get(url);

    const result = await this.app.mysql.insert('sms', {
      mobile: mobileNo,
      code: verifyCode,
      type: 1,
      date_created: new Date().toLocaleString(),
    });

    return {
      success: result.affectedRows === 1,
    };
  }

  async checkVerifyCode(mobileNo, verify) {
    const results = await this.app.mysql.select('sms', {
      where: { mobile: mobileNo },
      columns: [ 'code' ], // 要查询的表字段
      orders: [[ 'id', 'desc' ]], // 排序方式
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
