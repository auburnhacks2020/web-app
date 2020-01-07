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
		register: async (parent, { registrationForm }, { prisma }, info) => {
			const { firstName, lastName, email, password } = registrationForm;
			// check for email in database
			const oldUser = await prisma.user({ email });
			if (oldUser) {
				throw new Error('Email Taken');
			}

			sendVerifyEmail(email, firstName);
			// hash password and create user
			const hashedPassword = await bcrypt.hash(password, 10);
			const user = await prisma.createUser({
				firstName,
				lastName,
				email,
				password: hashedPassword
			});

			return user;
		},
		sendVerification: async (parent, { email }, ctx, info ) => {
			if (email === '') {
				throw new Error('Invalid Email')
			}
			const user = await ctx.prisma.user({ email });
			
			if (!user) {
				throw new Error('Invalid Login');
			}

			sendVerifyEmail(email, user.firstName)

			return true;
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
				process.env.LOGIN_SECRET,
				{
					expiresIn: '30d' // token will expire in 30days
				}
			);
			return {
				token,
				user
			};
		},
		verifyUser: async (parent, { email, password, token }, ctx, info) => {
			const user = await ctx.prisma.user({ email });

			if (!user) {
				throw new Error('Invalid Login');
			}

			const passwordMatch = await bcrypt.compare(password, user.password);

			if (!passwordMatch) throw new Error('Invalid Password');

			const valid = jwt.verify(token, process.env.EMAIL_SECRET);

			if (valid) {
				const verifiedUser = await ctx.prisma.updateUser({
					data: { emailVerified: true },
					where: { email }
				});

				return {
					verified: true,
					user: verifiedUser
				};
			} else {
				throw new Error('Invalid Token');
			}
		}
	}
};
