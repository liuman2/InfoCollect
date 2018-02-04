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

  async search(query) {
    // const results = await this.app.mysql.select('contact', {
    //   where: { user_id: query.userId },
    //   columns: ['id', 'user_id', 'contact_id', 'name', 'phone1', 'phone2', 'phone3', 'email1', 'email2', 'email3', 'address1', 'address2', 'organization_name', 'organization_title', 'birthday'],
    //   limit: query.pageSize,
    //   offset: query.page - 1, 
    // });
    // const count = await this.app.mysql.count('contact', { user_id: query.userId });

    const keyword = query.keyword.trim();
    const startIndex = (query.page - 1) * query.pageSize;
    const results = await this.app.mysql.query('select id, user_id, contact_id, name, phone1, phone2, phone3, email1, email2, email3, address1, address2, organization_name, organization_title, birthday from contact where user_id=? and name like ? or phone1 like ? or phone2 like ? or phone3 like ? limit ?, ?', [query.userId, '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', startIndex, query.pageSize - 0]);
    const totalRecord = await this.app.mysql.query('SELECT COUNT(*) AS count FROM `contact` where user_id=? and name like ? or phone1 like ? or phone2 like ? or phone3 like ?', [query.userId, '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%', '%' + keyword + '%']);

    return {
      record: results,
      totalRecord: totalRecord[0].count || 0,
    }
  }
}

module.exports = ContactService;
