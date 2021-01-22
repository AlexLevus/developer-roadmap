
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

export class CreateRoadmapInput {
    name: string;
    description: string;
}

export class CreateStageInput {
    name: string;
    path: string;
    newId: string;
    roadmapId: string;
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class LoginUserInput {
    email: string;
    password: string;
}

export class Email {
    id: string;
    userId: string;
    type: Type;
    isOpened: boolean;
    createdAt: number;
    updatedAt: number;
}

export abstract class IQuery {
    abstract emails(): Email[] | Promise<Email[]>;

    abstract roadmaps(): Roadmap[] | Promise<Roadmap[]>;

    abstract roadmapById(id?: string): Roadmap | Promise<Roadmap>;

    abstract stages(): Stage[] | Promise<Stage[]>;

    abstract user(id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract createEmail(input: CreateEmailInput): Email | Promise<Email>;

    abstract openEmail(id: string): boolean | Promise<boolean>;

    abstract createRoadmap(input?: CreateRoadmapInput): Roadmap | Promise<Roadmap>;

    abstract createStage(input?: CreateStageInput): Stage | Promise<Stage>;

    abstract createUser(input: CreateUserInput): User | Promise<User>;

    abstract verifyEmail(emailToken: string): boolean | Promise<boolean>;

    abstract login(input: LoginUserInput): LoginResponse | Promise<LoginResponse>;

    abstract refreshToken(refreshToken: string): RefreshTokenResponse | Promise<RefreshTokenResponse>;

    abstract changePassword(id: string, currentPassword: string, password: string): boolean | Promise<boolean>;

    abstract forgotPassword(email: string): boolean | Promise<boolean>;

    abstract resetPassword(resetPasswordToken: string, password: string): boolean | Promise<boolean>;
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
    firstName: string;
    lastName: string;
    resetPasswordToken?: string;
    resetPasswordExpires?: number;
    createdAt: number;
    lastLogin?: number;
    isVerified: boolean;
    isSuperuser: boolean;
}

export class LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export class RefreshTokenResponse {
    accessToken: string;
}
