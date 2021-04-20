import { Stage } from "@data/models/stage";

export interface Roadmap {
	id: string;
	name: string;
	description: string;
	rating: number;
	stages: Stage[];
	author: string;
}
