import { gql } from "@apollo/client/core";

export const GET_ALL_ROADMAPS = gql`
	{
		roadmaps {
			id
			name
			description
			stages {
				id
				name
				path
				roadmapId
			}
		}
	}
`;

export const GET_ROADMAP = gql`
	query roadmap($id: String!) {
		roadmap(id: $id) {
			id
			name
			description
			stages {
				id
				name
				path
				roadmapId
			}
		}
	}
`;

export const GET_USER = gql`
	query user($id: ID!) {
		user(id: $id) {
			id
			firstName
			lastName
			middleName
			isActive
			isAdmin
			createdAt
			lastLogin
			isCompleted
		}
	}
`;
