"use strict";

module.exports = app => {
  class MemberController extends app.Controller {
    async index() {
      this.ctx.body = "index";
    }
    async authenticate() {
      const { ctx } = this;
      const { username, password } = ctx.request.body;
      
      const response = await this.service.member.login({ username, password });
      this.ctx.body = response;
      this.ctx.status = 200;
    }

    async changepwd() {
      const { ctx } = this;
      const { uid, password } = ctx.request.body;
      
      const response = await this.service.member.changepwd({ uid, password });
      this.ctx.body = response;
      this.ctx.status = 200;
    }
  }
  return MemberController;
};
