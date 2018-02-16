var config = {};

const mongoURL = process.env.MONGO_URL || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';

config.mongoURI = {
	development: 'mongodb://localhost/biokey-dev',
	production: 'mongodb://localhost/biokey',
	test: 'mongodb://localhost/biokey-test'
};

config.secret = process.env.SECRET || 'thesecret';

config.port = 3000;

module.exports = config;