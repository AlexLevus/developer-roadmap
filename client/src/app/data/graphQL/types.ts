import { Roadmap } from "@data/models/roadmap";
import { Stage } from "@data/models/stage";
import { User } from "@data/models/user";
import { Department } from "@data/models/department";
import { Position } from "@data/models/position";
import { Skill } from "@data/models/skill";

export type RoadmapsResponse = {
	roadmaps: Roadmap[];
};

// TODO через author получать User
export type RoadmapResponse = {
	roadmap: {
		id: string;
		name: string;
		description: string;
		rating: number;
		stages: Stage[];
		author: Partial<User>;
	};
};

export type UserRoadmapsResponse = {
	userRoadmaps: Roadmap[];
};
export type DepartmentResponse = {
	department: {
		id: string;
		name: string;
		description: string;
		manager: Partial<User>;
	};
};

export type GetOrganizationDepartmentsResponse = {
	organizationDepartments: Department[];
};

export type CreateOrganizationResponse = {
	createOrganization: {
		id: string;
		name: string;
		directorId: string;
	};
};

export type AllUsersResponse = {
	users: User[];
};

export type OrganizationUsersResponse = {
	organizationUsers: User[];
};

export type UserResponse = {
	user: User;
};

export type PositionResponse = {
	positions: Position[];
};

export type SkillResponse = {
	skills: Skill[];
};

export type UpdateUserResponse = {
	updateUser: User;
};

export type CreateRoadmapResponse = {
	createRoadmap: Roadmap;
};

export type CreateStageResponse = {
	createStage: {
		name: string;
		path: string;
		roadmapId: string;
	};
};

export type CreateSubstageResponse = {
	createSubstage: {
		name: string;
		path: string;
		roadmapId: string;
	};
};

export type ToggleStageProgressResponse = {
	toggleStageProgress: boolean;
};

export type DeleteStageResponse = {
	deleteStage: boolean;
};

export type DeleteRoadmapResponse = {
	deleteRoadmap: boolean;
};

export interface LoginResponse {
	login: {
		id: string;
		refreshToken: string;
		accessToken: string;
	};
}

export type LoginResponseType = LoginResponse | null | undefined;
