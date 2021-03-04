import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@app/service/user.service";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"]
})
export class ResetPasswordComponent implements OnInit {
	state = "";
	submitted = false;
	isTokenValid: boolean | undefined;
	errorMessage = "";

	resetPasswordForm = new FormGroup({
		password: new FormControl(null, [Validators.required]),
		confirmPassword: new FormControl(null, [Validators.required])
	});

	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		const { token } = this.route.snapshot.params;

		this.userService.resetPassword(token).subscribe(
			() => {
				this.isTokenValid = true;
			},
			(error) => {
				this.errorMessage = error.message;
			}
		);
	}

	resetPassword() {
		const { password, confirmPassword } = this.resetPasswordForm.value;
		const { token } = this.route.snapshot.params;

		if (this.resetPasswordForm.invalid) {
			this.resetPasswordForm.markAllAsTouched();
			return;
		}

		if (password === confirmPassword) {
			this.submitted = true;

			this.userService
				.resetPassword(token, password)
				.subscribe(
					() => {
						this.state = "success";
					},
					() => {
						this.state = "error";
					}
				)
				.add(() => (this.submitted = false));
		}
	}

	closeState(): void {
		this.state = "";
		this.resetPasswordForm.reset();
	}
}
