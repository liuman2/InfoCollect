'use strict';

module.exports = app => {
  // console.log(app.oAuth2Server);
  // app.get('/', 'client.index');
  // app.post('/api/upload',app.oAuth2Server.authenticate(), 'uploadfile');

  // app.get('/api/restql/:res','restql.index');
  // app.get('/api/restql/:res/:id','restql.show');
  // app.post('/api/restql/:res',app.oAuth2Server.authenticate(), 'restql.create');
  // app.put('/api/restql/:res/:id',app.oAuth2Server.authenticate(), 'restql.update');
  // app.del('/api/restql/:res/:id',app.oAuth2Server.authenticate(), 'restql.destroy');

  // app.get('/api/table',app.oAuth2Server.authenticate(), 'tableinfo.index');
  // app.get('/api/table/:res',app.oAuth2Server.authenticate(), 'tableinfo.show');
  // app.post('/api/table',app.oAuth2Server.authenticate(), 'tableinfo.create');
  // app.put('/api/table',app.oAuth2Server.authenticate(), 'tableinfo.update');
  // app.del('/api/table/:res',app.oAuth2Server.authenticate(), 'tableinfo.destroy');

  // app.post('/api/member/authorize', 'member.authenticate');
  // app.all('/oauth2/access_token', app.oAuth2Server.token());
  // app.get('/user/authenticate', app.oAuth2Server.authenticate(), 'user.authenticate');

  const { router, controller } = app;

  router.post('/api/member/authorize', controller.member.authenticate);
  router.post('/api/member/changepwd', controller.member.changepwd);

  router.get('/api/user/search', controller.user.search);

  router.get('/api/profile/detail', controller.profile.detail);
  router.get('/api/profile/pass', controller.profile.pass);
  router.post('/api/profile/refuse', controller.profile.refuse);

  ///////////////
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/signin', controller.user.signin);
  router.get('/api/user/:id', controller.user.info);
  router.post('/api/user/resetPassword', controller.user.resetPassword);

  router.post('/api/sms/verify', controller.sms.verify);
  router.post('/api/attachment/upload', controller.attachment.upload);

  router.post('/api/profile/save', controller.profile.save);
  router.get('/api/profile/get', controller.profile.get);
  router.get('/api/profile/info', controller.profile.info);
  router.post('/api/loginlog/log', controller.loginlog.log);

  router.post('/api/contact/import', controller.contact.import);
  router.get('/api/contact/search', controller.contact.search);
  router.get('/api/loginlog/search', controller.loginlog.search);

  router.get('/api/test/get', controller.test.get);
  router.post('/api/test/post', controller.test.post);


};