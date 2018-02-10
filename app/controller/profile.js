'use strict';

const Controller = require('egg').Controller;

class ProfileController extends Controller {
  async save() {
    const { ctx } = this;
    const request = ctx.request.body;
    if (!request.user_id) {
      ctx.throw(500, 'user_id不能为空');
    }
    if (!request.name) {
      ctx.throw(500, 'name不能为空');
    }
    if (request.gender === null || request.gender === undefined) {
      ctx.throw(500, '性别不能为空');
    }
    if (!request.card_no) {
      ctx.throw(500, '身份证号码不能为空');
    }
    if (!request.card_front) {
      ctx.throw(500, '请上传身份证正面照');
    }
    if (!request.card_back) {
      ctx.throw(500, '请上传手持身份证照片');
    }
    if (!request.card_hold) {
      ctx.throw(500, '请上传手持身份证照片');
    }
    if (!request.self_photo) {
      ctx.throw(500, '请上传个人照片');
    }
    if (!request.address) {
      ctx.throw(500, '请输入家庭住址');
    }
    if (!request.tel) {
      ctx.throw(500, '请输入联系人电话');
    }
    if (!request.contact) {
      ctx.throw(500, '请输入联系人姓名');
    }

    const profile = await ctx.service.profile.save(request);
    ctx.body = profile;
    ctx.status = 200;
  }

  async get() {
    const { ctx } = this;
    const userId = ctx.query.user_id;
    const profileInfo = await ctx.service.profile.find(userId);
    ctx.body = {
      success: profileInfo !== null,
      profile: profileInfo,
    };
    ctx.status = 200;
  }

  async info() {
    const { ctx } = this;
    const userId = ctx.query.user_id;
    const profileInfo = await ctx.service.profile.find(userId);
    ctx.body = {
      success: profileInfo !== null,
      profile: {
        user_id: profileInfo.user_id,
        name: profileInfo.name,
        status: profileInfo.status,
        self_photo: profileInfo.self_photo,
        refuse:profileInfo.refuse,
      },
    };
    ctx.status = 200;
  }

  async detail() {
    const { ctx } = this;
    const id = ctx.query.id;

    const profileInfo = await ctx.service.profile.detail(id);
    ctx.body = {
      success: profileInfo !== null,
      profile: profileInfo,
    };
    ctx.status = 200;
  }

  async pass() {
    const { ctx } = this;
    const id = ctx.query.id;

    const result = await ctx.service.profile.pass(id);
    console.log(result)
    ctx.body = result;
    ctx.status = 200;
  }

  async refuse() {
    const { ctx } = this;
    const request = ctx.request.body;

    const result = await ctx.service.profile.refuse(request);
    console.log(result)
    ctx.body = result;
    ctx.status = 200;
  }
}

module.exports = ProfileController;
