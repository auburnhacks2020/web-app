const auth = require('./auth');
const application = require('./application')

const rootResolver = {
	Query: {
		...auth.Query,
		...application.Query
	},
	Mutation: {
		...auth.Mutation,
		...application.Mutation
	}
};

module.exports = rootResolver;
