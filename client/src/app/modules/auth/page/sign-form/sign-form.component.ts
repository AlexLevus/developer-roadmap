import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@app/service/auth.service";
import { User } from "@data/models/user";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { LoginResponse, UserResponse } from "@data/graphQL/types";
import { UserService } from "@app/service/user.service";
import { EMPTY } from "rxjs";
import { ApolloQueryResult, FetchResult } from "@apollo/client";

@Component({
	selector: "app-sign-form",
	templateUrl: "./sign-form.component.html",
	styleUrls: ["./sign-form.component.scss"]
})
export class SignFormComponent {
	state = "";
	isRegistrationProcessed = false;
	submitted = false;
	error = false;
	tabIndex = 0;
	message = "";

	loginForm = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [
			Validators.required,
			Validators.minLength(8)
		])
	});

	registrationForm = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [
			Validators.required,
			Validators.minLength(8)
		]),
		confirmPassword: new FormControl(null, [
			Validators.required,
			Validators.minLength(8)
		])
	});

	constructor(
		private authService: AuthService,
		private userService: UserService,
		private router: Router
	) {}

	login() {
		if (this.loginForm.invalid) {
			this.loginForm.markAllAsTouched();
			return;
		}
		this.submitted = true;

		const user: Partial<User> = {
			email: this.loginForm.value.email,
			password: this.loginForm.value.password
		};

		this.authService
			.login(user)
			.pipe(
				switchMap((res: FetchResult<LoginResponse>) => {
					const id = res.data?.login.id;
					return id ? this.userService.getUserById(id).valueChanges : EMPTY;
				})
			)
			.subscribe(
				(res: ApolloQueryResult<UserResponse>) => {
					this.loginForm.reset();

					if (res.data.user.isCompleted) {
						this.router.navigate(["/dashboard"]);
					} else {
						this.router.navigate(["/registration"]);
					}
				},
				() => {
					this.error = true;
				}
			)
			.add(() => (this.submitted = false));
	}

	register() {
		if (this.registrationForm.invalid) {
			this.registrationForm.markAllAsTouched();
			return;
		}

		const { email, password, confirmPassword } = this.registrationForm.value;

		if (password === confirmPassword) {
			this.submitted = true;
			const user: Partial<User> = { email, password };

			this.authService
				.register(user)
				.subscribe(
					(data) => {
						this.registrationForm.reset();
						this.state = "success";
					},
					() => {
						// TODO: обработать, если регистрация не удалась
						this.state = "error";
						this.error = true;
					}
				)
				.add(() => (this.submitted = false));
		}
	}

	closeState(): void {
		this.tabIndex = 1;
		this.state = "";
	}
}
