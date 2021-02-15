import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "@app/service/auth.service";
import { User } from "@data/models/user";
import { Router } from "@angular/router";

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

	constructor(private authService: AuthService, private router: Router) {}

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
			.subscribe(
				() => {
					this.loginForm.reset();
					this.router.navigate(["/dashboard"]);
				},
				() => {
					this.error = true;
				}
			)
			.add(() =>
				setTimeout(() => {
					this.submitted = false;
				}, 700)
			);
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
					() => {
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
