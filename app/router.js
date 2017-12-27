'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  router.post('/api/user', controller.user.register);

  // router.get('/member/:id', controller.member.info);
  router.get('/api/user/:id', controller.user.info);
  // app.router.resources('users', '/api/users', controller.users);
};
