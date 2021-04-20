import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { tap } from "rxjs/operators";
import { User } from "@data/models/user";
import { REGISTER_USER, LOGIN, VERIFY } from "@data/graphQL/mutations";
import { LoginResponse, LoginResponseType } from "@data/graphQL/types";

@Injectable({ providedIn: "root" })
export class AuthService {
	constructor(private apollo: Apollo) {}

	login(user: Partial<User>) {
		return this.apollo
			.mutate<LoginResponse>({
				mutation: LOGIN,
				variables: {
					input: user
				}
			})
			.pipe(
				tap((result) => {
					this.setToken(result.data);
				})
			);
	}

	verify(token: string) {
		return this.apollo.mutate<boolean>({
			mutation: VERIFY,
			variables: {
				emailToken: token
			}
		});
	}

	register(email: string, password: string) {
		return this.apollo.mutate<User>({
			mutation: REGISTER_USER,
			variables: {
				email,
				password
			}
		});
	}

	isAuthenticated(): boolean {
		const token = localStorage.getItem("access");
		return !!token;
	}

	private setToken(response: LoginResponseType): void {
		if (response) {
			const loginRes = response.login;
			localStorage.setItem("access", loginRes.accessToken);
			localStorage.setItem("refresh", loginRes.refreshToken);
		} else {
			localStorage.clear();
		}
	}
}
