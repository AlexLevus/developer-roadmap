export interface User {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	middleName: string;
	isActive: boolean;
	isAdmin: boolean;
	createdAt: Date;
	lastLogin: Date;
}
