import { Stage } from "@data/models/stage";
import { User } from "@data/models/user";

export interface Roadmap {
	id: string;
	name: string;
	description: string;
	rating: number;
	stages: Stage[];
	author: Partial<User>;
	startDate?: Date;
	isCompleted?: boolean;
	progress?: number;
}
