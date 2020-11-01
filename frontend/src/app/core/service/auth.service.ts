import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { tap } from "rxjs/operators";

const login = gql`
	mutation login($input: LoginUserInput!) {
		login(input: $input) {
			accessToken
			refreshToken
		}
	}
`;

export interface User {
	email: string;
	password: string;
}

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

	isAuthenticated(): boolean {
		const token = localStorage.getItem("access");
		return !!token;
	}

	private setToken(response: any): void {
		if (response) {
			const loginRes: LoginResponse = response.login;
			console.log(loginRes);
			localStorage.setItem("access", loginRes.accessToken);
			localStorage.setItem("refresh", loginRes.refreshToken);
		} else {
			localStorage.clear();
		}
	}
}
