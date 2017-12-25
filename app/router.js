'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  // router.get('/member/:id', controller.member.info);
  router.get('/users/:id', controller.users.info);
  // app.router.resources('users', '/api/users', controller.users);
};
