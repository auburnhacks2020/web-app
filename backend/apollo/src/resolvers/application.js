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
		submitApplication: async (parent, { applicationForm }, {user, prisma}, info) => {
			if (!user) {
				throw new Error('Not Authenticated');
			}

			console.log(user);

			let newApp = applicationForm;

			for (const [key, val] of Object.entries(applicationForm)) {
				if (val instanceof Array) {
					newApp[key] = {
						set: val
					}
				} else if (key === 'sponsorData') {
					let data = {
						create: val
					};
					for (const [subKey, subVal] of Object.entries(val)) {
						if (subVal instanceof Array) {
							data.create[subKey] = {
								set: subVal
							}
						}
					}
					newApp[key] = data;
				}
			}

			newApp = {
				upsert: {
					create: newApp,
					update: {
						...newApp,
						sponsorData: {
							upsert: {
								create: newApp.sponsorData.create,
								update: newApp.sponsorData.create
							}
						}
					}
				}
			};

			try {
				const updatedUser = await prisma.updateUser({
					data: { application: newApp },
					where: { id: user.id }
				});
				if (updatedUser) return { submitted: true };
			} catch (err) {
				console.log(err);
			}

			return {
				submitted: false
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
