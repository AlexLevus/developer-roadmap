import { gql } from "@apollo/client/core";

export const VERIFY = gql`
	mutation verifyEmail($emailToken: String!) {
		verifyEmail(emailToken: $emailToken)
	}
`;

export const LOGIN = gql`
	mutation login($input: LoginUserInput!) {
		login(input: $input) {
			id
			accessToken
			refreshToken
		}
	}
`;

export const REGISTER_USER = gql`
	mutation registerUser($email: String!, $password: String!) {
		registerUser(email: $email, password: $password) {
			firstName
			lastName
			email
			password
		}
	}
`;

export const CREATE_USER = gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input)
	}
`;

export const UPDATE_USER = gql`
	mutation updateUser($input: UpdateUserInput!) {
		updateUser(input: $input)
	}
`;

export const CREATE_ROADMAP = gql`
	mutation createRoadmap($input: CreateRoadmapInput!) {
		createRoadmap(input: $input) {
			id
			name
			description
		}
	}
`;

export const CREATE_STAGE = gql`
	mutation createStage($input: CreateStageInput!) {
		createStage(input: $input) {
			name
			path
			roadmapId
		}
	}
`;

export const CREATE_ORGANIZATION = gql`
	mutation createOrganization($name: String!, $directorId: String!) {
		createOrganization(name: $name, directorId: $directorId) {
			id
			name
			directorId
		}
	}
`;

export const CREATE_DEPARTMENT = gql`
	mutation createDepartment(
		$name: String!
		$description: String!
		$orgId: ID!
	) {
		createDepartment(name: $name, description: $description, orgId: $orgId) {
			id
			name
		}
	}
`;

export const CHANGE_PASSWORD = gql`
	mutation changePassword(
		$id: ID!
		$currentPassword: String!
		$password: String!
	) {
		changePassword(
			id: $id
			currentPassword: $currentPassword
			password: $password
		)
	}
`;

export const FORGOT_PASSWORD = gql`
	mutation forgotPassword($email: String!) {
		forgotPassword(email: $email)
	}
`;

export const RESET_PASSWORD = gql`
	mutation resetPassword($resetPasswordToken: String!, $password: String) {
		resetPassword(resetPasswordToken: $resetPasswordToken, password: $password)
	}
`;
