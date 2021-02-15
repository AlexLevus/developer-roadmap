import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Apollo } from "apollo-angular";
import { tap } from "rxjs/operators";
import { User } from "@data/models/user";
import { CREATE_USER, LOGIN, VERIFY } from "@data/graphQL/mutations";
import { LoginResponse } from "@data/graphQL/types";

@Injectable({ providedIn: "root" })
export class AuthService {
	public error$: Subject<string> = new Subject<string>();

	constructor(private apollo: Apollo) {}

	login(user: Partial<User>) {
		return this.apollo
			.mutate({
				mutation: LOGIN,
				variables: {
					input: user
				}
			})
			.pipe(tap(result => this.setToken(result.data)));
	}

	verify(token: string) {
		return this.apollo.mutate({
			mutation: VERIFY,
			variables: {
				emailToken: token
			}
		});
	}

	register(user: Partial<User>) {
		return this.apollo.mutate({
			mutation: CREATE_USER,
			variables: {
				input: {
					...user,
					firstName: "Alex",
					lastName: "Levus",
          middleName: "Vlas"
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
