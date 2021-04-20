import { User } from "@data/models/user";

export interface Department {
	id: string;
	name: string;
	description: string;
	manager: Partial<User>;
	org?: string; // TODO Organization
}
