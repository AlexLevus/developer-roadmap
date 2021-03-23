import { Roadmap } from "@data/models/roadmap";
import { Stage } from "@data/models/stage";
import { User } from "@data/models/user";
import { Department } from "@data/models/department";
import { Position } from "@data/models/position";
import { Skill } from "@data/models/skill";

export type RoadmapsResponse = {
	roadmaps: Roadmap[];
};

export type RoadmapResponse = {
	roadmap: {
		id: string;
		description: string;
		stages: Stage[];
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

export type GetAllUsersResponse = {
	users: User[];
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

export type CreateRoadmapResponse = {
	createRoadmap: Roadmap;
};

export type CreateStageResponse = {
	name: string;
	path: string;
	roadmapId: string;
};

export interface LoginResponse {
	login: {
		id: string;
		refreshToken: string;
		accessToken: string;
	};
}

export type LoginResponseType = LoginResponse | null | undefined;
