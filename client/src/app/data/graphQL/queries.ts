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

export const GET_ORGANIZATION_DEPARTMENTS = gql`
	query organizationDepartments($orgId: ID!) {
		organizationDepartments(orgId: $orgId) {
			id
			name
			description
			managerId
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
			orgId
		}
	}
`;

export const GET_ALL_USERS = gql`
	{
		users {
			id
			firstName
			lastName
			middleName
			isActive
			isAdmin
			createdAt
			lastLogin
		}
	}
`;

export const GET_POSITIONS = gql`
	query positions {
		positions {
			id
			name
			description
		}
	}
`;

export const GET_SKILLS = gql`
	query skills {
		skills {
			id
			name
		}
	}
`;
