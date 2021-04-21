import { gql } from "@apollo/client/core";

export const GET_ALL_ROADMAPS = gql`
	{
		roadmaps {
			id
			name
			description
			author {
				id
				firstName
				middleName
				lastName
			}
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
			rating
			author {
				id
				firstName
				middleName
				lastName
			}
			stages {
				id
				name
				path
				roadmapId
			}
		}
	}
`;

export const GET_USER_ROADMAPS = gql`
	query userRoadmaps($userId: ID!) {
		userRoadmaps(userId: $userId) {
			id
			name
			description
			rating
		}
	}
`;

export const GET_DEPARTMENT = gql`
	query department($id: ID!) {
		department(id: $id) {
			id
			name
			description
			manager {
				id
				firstName
				middleName
				lastName
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
			manager {
				id
				firstName
				middleName
				lastName
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
			orgId
			department {
				name
			}
		}
	}
`;

export const GET_ORGANIZATION_USERS = gql`
	query organizationUsers($orgId: ID!) {
		organizationUsers(orgId: $orgId) {
			id
			firstName
			lastName
			middleName
			isActive
			isAdmin
			createdAt
			lastLogin
			orgId
			department {
				name
			}
			position {
				name
			}
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
