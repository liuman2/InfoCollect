'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/signin', controller.user.signin);
  router.get('/api/user/:id', controller.user.info);
  router.post('/api/user/resetPassword', controller.user.resetPassword);

  router.post('/api/sms/verify', controller.sms.verify);

  router.post('/api/attachment/upload', controller.attachment.upload);

  router.post('/api/profile/save', controller.profile.save);
  router.get('/api/profile/get', controller.profile.get);

  router.post('/api/contact/import', controller.contact.import);
};
