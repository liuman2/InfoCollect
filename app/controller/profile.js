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
    if (!request.gender) {
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
  }
}

module.exports = ProfileController;
