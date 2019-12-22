const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: ID!
		email: String!
		firstName: String
		lastName: String
		emailVerified: Boolean!
		role: ROLE!
	}

	enum ROLE {
		ADMIN
		SPONSOR
		PARTICIPANT
	}

	input RegistrationForm {
		firstName: String!
		lastName: String!
		email: String!
		password: String!
	}

	type Query {
		currentUser: User!
	}

	type Mutation {
		register(registrationForm: RegistrationForm!): User!
		login(email: String!, password: String!): LoginResponse!
		verifyUser(email: String!, password: String!, token: String!): VerifyResponse!
		sendVerification(email: String!): EmailSentResponse!
	}

	type EmailSentResponse {
		sent: Boolean
	}

	type LoginResponse {
		token: String
		user: User
	}

	type VerifyResponse {
		verified: Boolean
		user: User
	}
`;

module.exports = typeDefs;
