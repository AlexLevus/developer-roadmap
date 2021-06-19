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
	mutation createRoadmap(
		$name: String!
		$description: String!
		$authorId: ID!
	) {
		createRoadmap(name: $name, description: $description, authorId: $authorId) {
			id
			name
			description
		}
	}
`;

export const CREATE_SUBSTAGE = gql`
	mutation createSubstage($input: CreateStageInput!) {
		createSubstage(input: $input) {
			name
			path
			roadmapId
		}
	}
`;

export const TOGGLE_STAGE_PROGRESS = gql`
	mutation toggleStageProgress($input: ToggleStageProgressInput!) {
		toggleStageProgress(input: $input)
	}
`;

export const DELETE_STAGE = gql`
	mutation deleteStage($input: DeleteStageInput!) {
		deleteStage(input: $input)
	}
`;

export const DELETE_ROADMAP = gql`
	mutation deleteRoadmap($id: ID!) {
		deleteRoadmap(id: $id)
	}
`;

export const CREATE_STAGE = gql`
	mutation createStage($roadmapId: String!, $text: String!) {
		createStage(roadmapId: $roadmapId, text: $text) {
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

export const ADD_ROADMAP_TO_USER = gql`
	mutation addRoadmapToUser($roadmapId: ID!, $userId: ID!) {
		addRoadmapToUser(roadmapId: $roadmapId, userId: $userId)
	}
`;

export const REMOVE_USER_ROADMAP = gql`
	mutation removeUserRoadmap($roadmapId: ID!, $userId: ID!) {
		removeUserRoadmap(roadmapId: $roadmapId, userId: $userId)
	}
`;

export const CREATE_DEPARTMENT = gql`
	mutation createDepartment(
		$name: String!
		$description: String!
		$orgId: ID!
		$managerId: ID!
	) {
		createDepartment(
			name: $name
			description: $description
			orgId: $orgId
			managerId: $managerId
		) {
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
