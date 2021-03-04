import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "@app/service/user.service";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent {
	state = "";
	submitted = false;

	forgotPasswordForm = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email])
	});

	constructor(private userService: UserService) {}

	forgotPassword() {
		const { email } = this.forgotPasswordForm.value;

		if (this.forgotPasswordForm.invalid) {
			this.forgotPasswordForm.markAllAsTouched();
			return;
		}

		this.submitted = true;

		this.userService
			.forgotPassword(email)
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

	closeState(): void {
		this.state = "";
		this.forgotPasswordForm.reset();
	}
}
