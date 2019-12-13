const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	Query: {
		// currentUser: (parent, args, { user, prisma }) => {
		// 	// this if statement is our authentication check
		// 	if (!user) {
		// 		throw new Error('Not Authenticated');
		// 	}
		// 	return prisma.user({ id: user.id });
		// }
	},
	Mutation: {
		register: async (parent, { registrationForm }, { prisma }, info) => {
		
		},
		
	}
};
