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

  async search() {
    const { ctx } = this;
    const query = ctx.query;

    const response = await ctx.service.loginlog.search(query);
    ctx.body = response;
    ctx.status = 200;
  }
}

module.exports = LoginlogController;
