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

class TestController extends Controller {
  async post() {
    const { ctx } = this;
    ctx.body = {
      success: true,
    };
  }

  async get() {
    const { ctx } = this;
    ctx.body = {
      success: true,
    };
  }
}

module.exports = TestController;
