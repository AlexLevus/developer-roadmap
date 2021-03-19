
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum Type {
    VERIFY_EMAIL = "VERIFY_EMAIL",
    FORGOT_PASSWORD = "FORGOT_PASSWORD"
}

export class CreateEmailInput {
    userId: string;
    type: Type;
}

export class CreateOrganizationInput {
    name: string;
}

export class CreateRoadmapInput {
    name: string;
    description: string;
}

export class CreateStageInput {
    name: string;
    path: string;
}

export class CreateUserInput {
    email: string;
    password: string;
}

export class UpdateUserInput {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class Department {
    id: string;
    name: string;
    description: string;
    managerId?: string;
    org?: Organization;
    isActive: boolean;
}

export abstract class IQuery {
    abstract organizationDepartments(orgId?: string): Department[] | Promise<Department[]>;

    abstract emails(): Email[] | Promise<Email[]>;

    abstract organization(): Organization[] | Promise<Organization[]>;

    abstract roadmaps(): Roadmap[] | Promise<Roadmap[]>;

    abstract roadmap(id?: string): Roadmap | Promise<Roadmap>;

    abstract stages(): Stage[] | Promise<Stage[]>;

    abstract user(id: string): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;
}

export abstract class IMutation {
    abstract createDepartment(name: string, description: string, orgId: string): Department | Promise<Department>;

    abstract createEmail(input: CreateEmailInput): Email | Promise<Email>;

    abstract openEmail(id: string): boolean | Promise<boolean>;

    abstract createOrganization(name: string, directorId: string): Organization | Promise<Organization>;

    abstract createRoadmap(input?: CreateRoadmapInput): Roadmap | Promise<Roadmap>;

    abstract createStage(input?: CreateStageInput): Stage | Promise<Stage>;

    abstract createUser(input: CreateUserInput): User | Promise<User>;

    abstract updateUser(input: UpdateUserInput): boolean | Promise<boolean>;

    abstract verifyEmail(emailToken: string): boolean | Promise<boolean>;

    abstract login(input: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract refreshToken(refreshToken: string): RefreshTokenResponse | Promise<RefreshTokenResponse>;

    abstract changePassword(id: string, currentPassword: string, password: string): boolean | Promise<boolean>;

    abstract forgotPassword(email: string): boolean | Promise<boolean>;

    abstract resetPassword(resetPasswordToken: string, password?: string): boolean | Promise<boolean>;
}

export class Email {
    id: string;
    userId: string;
    type: Type;
    isOpened: boolean;
    createdAt: number;
    updatedAt: number;
}

export class Organization {
    id: string;
    name: string;
    directorId: string;
}

export class Roadmap {
    id: string;
    name: string;
    description: string;
    content: string;
    rating: number;
    isActive: boolean;
    stages?: Stage[];
}

export class Stage {
    id: string;
    name: string;
    path: string;
    roadmapId: string;
}

export class User {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    createdAt: number;
    lastLogin?: number;
    isAdmin: boolean;
    isActive: boolean;
    isCompleted?: boolean;
}

export class LoginResponse {
    id: string;
    accessToken: string;
    refreshToken: string;
}

export class RefreshTokenResponse {
    accessToken: string;
}
