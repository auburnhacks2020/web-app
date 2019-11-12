const auth = require('./auth')

const rootResolver = {
	...auth
};

module.exports = rootResolver;
