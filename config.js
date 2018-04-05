var config = {};

const mongoURL = process.env.MONGO_URL || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';

config.mongoURI = {
	development: `mongodb://${mongoURL}:${mongoPort}/biokey-dev`,
	production: `mongodb://${mongoURL}:${mongoPort}/biokey`,
	test: `mongodb://${mongoURL}:${mongoPort}/biokey-test`
};

config.secret = process.env.SECRET || 'thesecret';

config.port = process.env.PORT || 3000;

module.exports = config;