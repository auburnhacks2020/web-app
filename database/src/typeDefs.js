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

	type Query {
		currentUser: User!
	}

	type Mutation {
		register(email: String!, password: String!): User!
		login(email: String!, password: String!): LoginResponse!
	}

	type LoginResponse {
		token: String
		user: User
	}
`;

module.exports = typeDefs;
