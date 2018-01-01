'use strict';

const Controller = require('egg').Controller;

class SmsController extends Controller {
  async verify() {
    const { ctx } = this;
    const request = ctx.request.body;
    if (!request.mobile) {
      this.ctx.throw(500, '手机不能为空');
    }
    const header = new Buffer(encodeURIComponent(`${request.mobile}:${request.type}`).toLocaleLowerCase()).toString('base64');
    if (ctx.request.headers['lxh-sms'] !== `lxh-app ${header}`) {
      this.ctx.throw(500, '您没有权限获取验证码');
    }

    await ctx.service.sms.sendSms(request.mobile);
    ctx.body = true;
  }
}

module.exports = SmsController;
