const extend = require('extend');

const env = process.env.NODE_ENV || 'development';

const config = {
  base: {},
  development: {
    mmQuery: {
      domain: 'localhost',
      port: 3001,
      mongo: {
        domain: 'localhost',
        port: 27017,
        db: 'meme-mart'
      }
    },
    memeMart: {
      domain: 'localhost',
      port: 3000
    }
  }
};

module.exports = extend(true, {}, config.base, config[env]);
