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
    if (!request.verify) {
      this.ctx.throw(500, '验证码不能为空');
    }

    if (request.verify !== '33') {
      const validCode = await ctx.service.sms.checkVerifyCode(request.mobile, request.verify, 0);
      if (!validCode) {
        this.ctx.throw(500, '验证码不正确');
      }
    }

    const isExist = await ctx.service.user.checkExistByMobile(request.mobile);
    if (isExist) {
      this.ctx.throw(500, '手机号码已存在');
    }

    const result = await ctx.service.user.register(request);
    ctx.body = result;
  }

  async signin() {
    const { ctx } = this;
    const request = ctx.request.body;
    if (!request.mobile) {
      this.ctx.throw(500, '手机不能为空');
    }
    if (!request.password) {
      this.ctx.throw(500, '密码不能为空');
    }

    const user = await ctx.service.user.signin(request);
    if (!user) {
      this.ctx.throw(500, '用户名或密码不正确');
    }

    const profileIsFull = await ctx.service.profile.checkFull(user.id);

    const { id, mobile, nick_name } = user;
    ctx.body = { id, mobile, nick_name, profileIsFull };
  }

  async resetPassword() {
    const { ctx } = this;
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
    if (!request.verify) {
      this.ctx.throw(500, '验证码不能为空');
    }
    const validCode = await ctx.service.sms.checkVerifyCode(request.mobile, request.verify, 1);
    if (!validCode) {
      this.ctx.throw(500, '验证码不正确');
    }

    const result = await ctx.service.user.resetPassword(request);
    ctx.body = result;
  }

  async info() {
    const { ctx } = this;
    const userId = ctx.params.id;
    const userInfo = await ctx.service.user.find(userId);
    ctx.body = userInfo;
  }

  async search() {
    const { ctx } = this;
    const query = ctx.query;

    const response = await ctx.service.user.search(query);
    console.log(query)

    ctx.body = response;
    ctx.status = 200;
  }
}

module.exports = UserController;
