'use strict';

const Controller = require('egg').Controller;

class ContactController extends Controller {
  async import() {
    const { ctx } = this;
    const request = ctx.request.body;
    if (!request.user_id) {
      ctx.body = null;
    }

    request.contacts = request.contacts || [];
    if (!request.contacts.length) {
      ctx.body = null;
    }

    ctx.body = true;
  }
}

module.exports = ContactController;
