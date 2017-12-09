var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/biokey-dev',
  production: 'mongodb://localhost/biokey',
  test: 'mongodb://localhost/biokey-test'
};

config.secret = 'thesecret';

module.exports = config;