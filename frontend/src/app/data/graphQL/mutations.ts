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

export const CREATE_USER = gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input) {
			firstName
			lastName
			email
			password
		}
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
