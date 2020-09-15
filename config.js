const extend = require('extend');

const env = process.env.NODE_ENV || 'development';

const config = {
  base: {},
  development: {
    mmQuery: {
      mongo: {
        domain: 'localhost',
        port: '27017',
        db: 'meme-mart'
      }
    }
  }
};

module.exports = extend(true, {}, config.base, config[env]);
