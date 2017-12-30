'use strict';

const Controller = require('egg').Controller;

class SmsController extends Controller {
  async verify() {
    const { ctx } = this;
    
    const request = ctx.request.body;
    if (!request.mobile) {
      this.ctx.throw(500, '手机不能为空');
    }

    await ctx.service.sms.sendSms(request.mobile);
    ctx.body = true;
  }
}

module.exports = SmsController;
