'use strict';

const Controller = require('egg').Controller;

class UsersController extends Controller {
  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.users.find(userId);
    ctx.body = userInfo;
  }
}

module.exports = UsersController;
