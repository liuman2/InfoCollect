'use strict';

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');
const awaitWriteStream = require('await-stream-ready').write;

const Controller = require('egg').Controller;

class AttachmentController extends Controller {
  async upload() {
    const { ctx } = this;
    const stream = await this.ctx.getFileStream();
    const filename = new Date().getTime() + path.extname(stream.filename).toLowerCase();
    const target = path.join(this.config.baseDir, 'app/public/photos', filename);
    const writeStream = fs.createWriteStream(target);
    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }

    ctx.body = {
      url: `${ctx.request.protocol}://${ctx.request.host}/public/photos/${filename}`,
    };
  }
}

module.exports = AttachmentController;
