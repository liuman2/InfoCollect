'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    // this.ctx.body = 'hi, egg';

    const ctx = this.ctx;
    ctx.body = await ctx.renderView("public/index.html");
  }
}

module.exports = HomeController;
