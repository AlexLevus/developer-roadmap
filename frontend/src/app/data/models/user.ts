export interface User {
	id: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	middleName: string;
	isActive: boolean;
	isAdmin: boolean;
	isCompleted: boolean;
	createdAt: Date;
	lastLogin: Date;
}
