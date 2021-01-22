import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { tap } from "rxjs/operators";
import { User } from "@data/schema/user";

const verify = gql`
	mutation verifyEmail($emailToken: String!) {
		verifyEmail(emailToken: $emailToken)
	}
`;

const login = gql`
	mutation login($input: LoginUserInput!) {
		login(input: $input) {
			accessToken
			refreshToken
		}
	}
`;

const createUser = gql`
	mutation createUser($input: CreateUserInput!) {
		createUser(input: $input) {
			firstName
			lastName
			email
			password
		}
	}
`;

interface LoginResponse {
	refreshToken: string;
	accessToken: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private apollo: Apollo) {}

	login(user: User) {
		return this.apollo
			.mutate({
				mutation: login,
				variables: {
					input: user
				}
			})
			.pipe(tap(result => this.setToken(result.data)));
	}

	verify(token: string) {
		return this.apollo.mutate({
			mutation: verify,
			variables: {
				emailToken: token
			}
		});
	}

	register(user: User) {
		return this.apollo.mutate({
			mutation: createUser,
			variables: {
				input: {
					...user,
					firstName: "Alex",
					lastName: "Levus"
				}
			}
		});
	}

	isAuthenticated(): boolean {
		const token = localStorage.getItem("access");
		return !!token;
	}

	private setToken(response: any): void {
		if (response) {
			const loginRes: LoginResponse = response.login;
			localStorage.setItem("access", loginRes.accessToken);
			localStorage.setItem("refresh", loginRes.refreshToken);
		} else {
			localStorage.clear();
		}
	}
}
