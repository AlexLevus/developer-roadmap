export interface User {
	id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	middleName: string;
	orgId: string;
	positionId: string;
	departmentId?: string;
	skills?: string[];
	isActive: boolean;
	isAdmin: boolean;
	createdAt: Date;
	lastLogin: Date;
}
