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
		// register: async (parent, { registrationForm }, { prisma }, info) => {
		// 	const { firstName, lastName, email, password } = registrationForm;
		// 	// check for email in database
		// 	const oldUser = await prisma.user({ email });
		// 	return user;

		submitApplication: async (
			parent,
			{ applicationForm },
			{ user, prisma },
			info
		) => {
			if (!user) {
				throw new Error('Not Authenticated');
			}

			const app = await prisma.createApplication(applicationForm);
			const updatedUser = await prisma.updateUser({
				data: { application: app.id },
				where: { id: user.id }
			});

			return {
				submitted: true
			};
		},
		updateApplication: async (
			parent,
			{ applicationForm },
			{ user, prisma },
			info
		) => {
			if (!user) {
				throw new Error('Not Authenticated');
			}

			const appId = await prisma.user({ id: user.id }).application;
			const app = await prisma.updateApplication({
				data: { applicationForm },
				where: { id: appId }
			});

			return {
				updated: true
			};
		}
	}
};
