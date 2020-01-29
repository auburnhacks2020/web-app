const { gql } = require('apollo-server');

const typeDefs = gql`
	type User {
		id: ID!
		email: String!
		firstName: String
		lastName: String
		emailVerified: Boolean!
		appComplete: Boolean!
		application: Application
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

	type Application {
		id: ID!
		studentId: String
		dateOfBirth: String
		phoneNumber: String
		gender: String
		race: String
		languages: [String]
		dietaryRestrictions: [String]
		specialAccomodations: [String]
		shirtSize: String
		needTravel: Boolean
		emailOptIn: Boolean
		acceptCodeOfConduct: Boolean
		sponsorData: SponsorData
		sendToSponsors: Boolean
	}

	type SponsorData {
		major: String
		educationLevel: String
		school: String
		interests: [String]
		experience: Int
		hackathonAwards: [String]
		skills: [String]
		gpa: String
		aboutYou: String
		biggestChallenge: String
		resume: String
	}

	input ApplicationForm {
		studentId: String
		dateOfBirth: String
		phoneNumber: String
		gender: String
		race: String
		languages: [String]
		dietaryRestrictions: [String]
		specialAccomodations: [String]
		shirtSize: String
		needTravel: Boolean
		emailOptIn: Boolean
		acceptCodeOfConduct: Boolean
		sponsorData: SponsorDataForm
		sendToSponsors: Boolean
	}

	input SponsorDataForm {
		major: String
		educationLevel: String
		school: String
		interests: [String]
		experience: Int
		hackathonAwards: [String]
		skills: [String]
		gpa: String
		aboutYou: String
		biggestChallenge: String
		resume: String
	}

	type Query {
		currentUser: User!
	}

	type Mutation {
		register(registrationForm: RegistrationForm!): User!
		login(email: String!, password: String!): LoginResponse!
		verifyUser(
			email: String!
			password: String!
			token: String!
		): VerifyResponse!
		sendVerification(email: String!): EmailSentResponse!

		submitApplication(applicationForm: ApplicationForm!): SubmitResponse!
		updateApplication(applicationForm: ApplicationForm!): UpdateResponse!
	}

	type SubmitResponse {
		submitted: Boolean
	}

	type UpdateResponse {
		updated: Boolean
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
