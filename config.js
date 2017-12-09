var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/biokey-dev',
  production: 'mongodb://localhost/biokey',
  test: 'mongodb://localhost/biokey-test'
};

config.secret = 'thesecret';

config.port = 3000;

module.exports = config;