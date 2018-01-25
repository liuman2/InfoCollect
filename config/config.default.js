'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '';

  // add your config here
  config.middleware = [ 'robot', 'errorHandler', 'apiWrapper' ];

  config.robot = {
    ua: [/curl/i, /Baiduspider/i]
  };

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  config.security = {
    ignore: '/api/',
    domainWhiteList: [
      'http://127.0.0.1:8001',
      'http://47.94.102.194:8001',
      'http://localhost:8001'
    ],
    methodnoallow: { enable: false },
    csrf: {
      enable: false,
      ignoreJSON: true,
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
  };

  config.cors = {
    allowMethods: 'GET,HEAD,PUT,OPTIONS,POST,DELETE,PATCH'
  };

  // config.multipart = {
  //   fileExtensions: ['.xls', '.doc', '.ppt', '.docx', '.xlsx', '.pptx']
  // }

  config.oAuth2Server = {
    grants: ['password'],
    expires: 60
  }

  config.cluster = {
    listen: {
      port: 8001,
    }
  }

  config.view = {
    defaultViewEngine: "nunjucks",
    mapping: {
      ".tpl": "nunjucks"
    }
  };


  return config;
};
