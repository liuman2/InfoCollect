'use strict';

const Controller = require('egg').Controller;

class ContactController extends Controller {
  async import() {
    const { ctx } = this;
    const request = ctx.request.body;
    if (!request.user_id) {
      ctx.body = false;
      return;
    }

    request.contacts = request.contacts || [];
    if (!request.contacts.length) {
      ctx.body = false;
      return;
    }

    ctx.service.contact.import(request.user_id, request.contacts);
    ctx.body = true;
  }
}

module.exports = ContactController;
