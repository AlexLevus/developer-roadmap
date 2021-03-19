import { Injectable } from "@angular/core";
import { GetAllUsersResponse, UserResponse } from "@data/graphQL/types";
import { GET_ALL_USERS, GET_USER } from "@data/graphQL/queries";
import { Apollo } from "apollo-angular";
import {
	FORGOT_PASSWORD,
	CHANGE_PASSWORD,
	UPDATE_USER,
	RESET_PASSWORD
} from "@data/graphQL/mutations";
import { User } from "@data/models/user";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(private apollo: Apollo) {}

	getAllUsers() {
		return this.apollo.watchQuery<GetAllUsersResponse>({
			query: GET_ALL_USERS
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

	updateUser(user: Partial<User>) {
		return this.apollo.mutate<boolean>({
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
