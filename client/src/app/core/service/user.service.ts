import { Injectable } from "@angular/core";
import {
	AllUsersResponse,
	OrganizationUsersResponse,
	PositionResponse,
	SkillResponse,
	UpdateUserResponse,
	UserResponse
} from "@data/graphQL/types";
import {
	GET_ALL_USERS,
	GET_ORGANIZATION_USERS,
	GET_POSITIONS,
	GET_SKILLS,
	GET_USER
} from "@data/graphQL/queries";
import { Apollo } from "apollo-angular";
import {
	FORGOT_PASSWORD,
	CHANGE_PASSWORD,
	UPDATE_USER,
	RESET_PASSWORD,
	CREATE_USER
} from "@data/graphQL/mutations";
import { User } from "@data/models/user";
import { tap } from "rxjs/operators";
import { currentUserVar } from "../../graphql.module";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(private apollo: Apollo) {}

	getAllUsers() {
		return this.apollo.watchQuery<AllUsersResponse>({
			query: GET_ALL_USERS
		});
	}

	getOrganizationUsers(orgId: string) {
		return this.apollo.watchQuery<OrganizationUsersResponse>({
			query: GET_ORGANIZATION_USERS,
			variables: {
				orgId
			}
		});
	}

	getUserById(id: string) {
		return this.apollo.watchQuery<UserResponse>({
			query: GET_USER,
			variables: {
				id
			}
		});
	}

	getCurrentUser(id: string) {
		return this.getUserById(id).valueChanges.pipe(
			tap(({ data }) => {
				currentUserVar(data.user);
			})
		);
	}

	getPositions() {
		return this.apollo.watchQuery<PositionResponse>({
			query: GET_POSITIONS
		});
	}

	getSkills() {
		return this.apollo.watchQuery<SkillResponse>({
			query: GET_SKILLS
		});
	}

	createUser(user: Partial<User>) {
		return this.apollo.mutate<boolean>({
			mutation: CREATE_USER,
			variables: {
				input: user
			},
			refetchQueries: [
				{ query: GET_ORGANIZATION_USERS, variables: { orgId: user.orgId } }
			]
		});
	}

	updateUser(user: Partial<User>) {
		return this.apollo.mutate<UpdateUserResponse>({
			mutation: UPDATE_USER,
			variables: {
				input: user
			}
		});
	}

	changePassword(id: string, password: string, currentPassword: string) {
		return this.apollo.mutate<boolean>({
			mutation: CHANGE_PASSWORD,
			variables: {
				id,
				currentPassword,
				password
			}
		});
	}

	forgotPassword(email: string) {
		return this.apollo.mutate<boolean>({
			mutation: FORGOT_PASSWORD,
			variables: {
				email
			}
		});
	}

	resetPassword(token: string, newPassword?: string) {
		return this.apollo.mutate<boolean>({
			mutation: RESET_PASSWORD,
			variables: {
				resetPasswordToken: token,
				password: newPassword
			}
		});
	}
}
