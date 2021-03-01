import { Injectable } from "@angular/core";
import { UserResponse } from "@data/graphQL/types";
import { GET_USER } from "@data/graphQL/queries";
import { Apollo } from "apollo-angular";
import { UPDATE_USER } from "@data/graphQL/mutations";
import { User } from "@data/models/user";

@Injectable({
	providedIn: "root"
})
export class UserService {
	constructor(private apollo: Apollo) {}

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
}
