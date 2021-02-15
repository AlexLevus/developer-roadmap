import { Roadmap } from "@data/models/roadmap";
import { Stage } from "@data/models/stage";
import { User } from "@data/models/user";

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

export type UserResponse = {
  user: User
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
	refreshToken: string;
	accessToken: string;
}
