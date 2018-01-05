'use strict';

const Controller = require('egg').Controller;

class LoginlogController extends Controller {
  async log() {
    const { ctx } = this;
    const request = ctx.request.body;
    if (!request.user_id) {
      ctx.body = false;
      return;
    }

    ctx.service.loginlog.log(request);
    ctx.body = true;
  }
}

module.exports = LoginlogController;
