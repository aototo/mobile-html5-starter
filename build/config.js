const debug = require('debug')('app:configJs');
const ip    = require("ip");

// ==============
// base config
// ==============

const config = {
  env : process.env.NODE_ENV || false,
  port: 8080,
  host: ip.address() || 'localhost',
  is_cdn: process.env.CDN || false,
  cdn_url : 'http://www.baidu.com/'
};


// ==============
// globals
// ==============

debug('globals variable');

config.globals = {
  'process.env': {
    'NODE_ENV':  JSON.stringify(config.env)
  },
  '__DEV__'    : config.env === 'development',
}

module.exports = config;
