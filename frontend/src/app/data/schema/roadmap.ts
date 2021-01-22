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
	roadmapId?: string;
}

export interface StageNode {
	[key: string]: any;
	name: string;
	path: string;
	children?: StageNode[];
}
