const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerifyEmail } = require('../utils');

module.exports = {
	Query: {
		currentUser: (parent, args, { user, prisma }) => {
			// this if statement is our authentication check
			if (!user) {
				throw new Error('Not Authenticated');
			}
			return prisma.user({ id: user.id });
		}
	},
	Mutation: {
		register: async (parent, { registrationForm }, ctx, info) => {
			const { firstName, lastName, email, password } = registrationForm;
			// check for email in database
			const emailTaken = await ctx.prisma.user({ email });
			if (emailTaken) {
				throw new Error('Email Taken');
			}

			const sent = await sendVerifyEmail();
			// hash password and create user
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await ctx.prisma.createUser({
				firstName,
				lastName,
				email,
				password: hashedPassword
			});

			return user;
		},
		login: async (parent, { email, password }, ctx, info) => {
			const user = await ctx.prisma.user({ email });

			if (!user) {
				throw new Error('Invalid Login');
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) {
				throw new Error('Invalid Password');
			}

			const token = jwt.sign(
				{
					id: user.id,
					email: user.email
				},
				process.env.DB_SECRET,
				{
					expiresIn: '30d' // token will expire in 30days
				}
			);
			return {
				token,
				user
			};
		}
	}
};
