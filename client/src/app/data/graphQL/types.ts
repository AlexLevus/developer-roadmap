import { Roadmap } from "@data/models/roadmap";
import { Stage } from "@data/models/stage";
import { User } from "@data/models/user";
import { Department } from "@data/models/department";

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

export type GetAllUsersResponse = {
	users: User[];
};

export type UserResponse = {
	user: User;
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
