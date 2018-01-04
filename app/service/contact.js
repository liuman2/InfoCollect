'use strict';

const Service = require('egg').Service;

class ContactService extends Service {
  async import(userId, contacts) {
    for (let i = 0, max = contacts.length; i < max; i++) {
      const contact = contacts[i];
      contact.user_id = userId;

      const dbContact = await this.app.mysql.get('contact', { user_id: userId, contact_id: contact.contact_id });
      if (dbContact) {
        continue;
      }
      await this.app.mysql.insert('contact', contact);
    }
  }
}

module.exports = ContactService;
