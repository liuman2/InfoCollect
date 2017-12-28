'use strict';

const Controller = require('egg').Controller;

// const createRule = {
//   mobile: {
//     type: 'string',
//     required: false,
//   },
//   password: {
//     type: 'string',
//     required: false,
//   },
// };

class UserController extends Controller {
  async register() {
    const { ctx } = this;

    // ctx.validate(createRule);
    const request = ctx.request.body;
    if (!request.mobile) {
      this.ctx.throw(500, '手机不能为空');
    }
    if (request.mobile.length > 20) {
      this.ctx.throw(500, '手机号码不正确');
    }
    if (!request.password) {
      this.ctx.throw(500, '密码不能为空');
    }
    if (request.password.length > 20) {
      this.ctx.throw(500, '密码长度不能超过20位');
    }

    const isExist = await ctx.service.user.checkExistByMobile(request.mobile);
    if (isExist) {
      this.ctx.throw(500, '手机号码已存在');
    }

    const result = await ctx.service.user.register(request);
    ctx.body = result;
  }

  async login() {
    const { ctx } = this;

    const request = ctx.request.body;
    if (!request.mobile) {
      this.ctx.throw(500, '手机不能为空');
    }
    if (!request.password) {
      this.ctx.throw(500, '密码不能为空');
    }

    const result = await ctx.service.user.register(request);
    ctx.body = result;
  }

  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }
}

module.exports = UserController;
