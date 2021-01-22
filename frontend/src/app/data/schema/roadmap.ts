export interface Roadmap {
	id: string;
	name: string;
	description: string;
	stages: Stage[];
}

export interface Stage {
	name: string;
	path: string;
	newId?: string;
	roadmapId: string;
}
