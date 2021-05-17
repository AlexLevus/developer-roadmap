
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

export class SkillInput {
    id?: string;
    name: string;
}

export class CreateStageInput {
    name: string;
    path: string;
    roadmapId: string;
}

export class ToggleStageProgressInput {
    roadmapId: string;
    stageIds: string[];
    isCompleted: boolean;
}

export class CreateUserInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName: string;
    skills?: SkillInput[];
    orgId: string;
    positionId: string;
    departmentId: string;
}

export class UpdateUserInput {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    orgId: string;
    positionId: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class Department {
    id: string;
    name: string;
    description: string;
    manager: User;
    org?: Organization;
    isActive: boolean;
}

export abstract class IQuery {
    abstract department(id?: string): Department | Promise<Department>;

    abstract organizationDepartments(orgId?: string): Department[] | Promise<Department[]>;

    abstract emails(): Email[] | Promise<Email[]>;

    abstract organization(): Organization[] | Promise<Organization[]>;

    abstract positions(): Position[] | Promise<Position[]>;

    abstract roadmaps(): Roadmap[] | Promise<Roadmap[]>;

    abstract roadmap(id?: string): Roadmap | Promise<Roadmap>;

    abstract userRoadmaps(userId: string): Roadmap[] | Promise<Roadmap[]>;

    abstract skills(): Skill[] | Promise<Skill[]>;

    abstract stages(): Stage[] | Promise<Stage[]>;

    abstract user(id: string): User | Promise<User>;

    abstract users(): User[] | Promise<User[]>;

    abstract organizationUsers(orgId: string): User[] | Promise<User[]>;
}

export abstract class IMutation {
    abstract createDepartment(name: string, description: string, orgId: string, managerId: string): Department | Promise<Department>;

    abstract createEmail(input: CreateEmailInput): Email | Promise<Email>;

    abstract openEmail(id: string): boolean | Promise<boolean>;

    abstract createOrganization(name: string, directorId: string): Organization | Promise<Organization>;

    abstract createRoadmap(name: string, description: string, authorId?: string): Roadmap | Promise<Roadmap>;

    abstract addRoadmapToUser(roadmapId: string, userId: string): boolean | Promise<boolean>;

    abstract removeUserRoadmap(roadmapId: string, userId: string): boolean | Promise<boolean>;

    abstract createSkill(name: string): boolean | Promise<boolean>;

    abstract createStage(text: string, roadmapId: string): Stage | Promise<Stage>;

    abstract createSubstage(input?: CreateStageInput): Stage | Promise<Stage>;

    abstract toggleStageProgress(input?: ToggleStageProgressInput): boolean | Promise<boolean>;

    abstract registerUser(email: string, password: string): User | Promise<User>;

    abstract updateUser(input: UpdateUserInput): boolean | Promise<boolean>;

    abstract createUser(input?: CreateUserInput): boolean | Promise<boolean>;

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

export class Position {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
}

export class Roadmap {
    id: string;
    name: string;
    description: string;
    rating: number;
    isActive: boolean;
    isCompleted: boolean;
    stages?: Stage[];
    author: User;
    startDate: Date;
    userRoadmapId?: string;
    progress?: number;
}

export class Skill {
    id: string;
    name: string;
}

export class Stage {
    id: string;
    name: string;
    path: string;
    isCompleted?: boolean;
    roadmapId: string;
}

export class UserProgressInfo {
    isCompleted?: boolean;
}

export class User {
    id: string;
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    middleName?: string;
    orgId?: string;
    positionId?: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    createdAt: number;
    lastLogin?: number;
    isAdmin: boolean;
    isActive: boolean;
    skills?: Skill[];
    department?: Department;
    position?: Position;
}

export class LoginResponse {
    id: string;
    accessToken: string;
    refreshToken: string;
}

export class RefreshTokenResponse {
    accessToken: string;
}
