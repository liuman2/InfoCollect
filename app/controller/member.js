'use strict';

const Controller = require('egg').Controller;

class MemberController extends Controller {
  async info() {
    const { ctx } = this;
    const memberId = ctx.params.id;
    const memberInfo = await ctx.service.member.find(memberId);
    ctx.body = memberInfo;
  }
}

module.exports = MemberController;
