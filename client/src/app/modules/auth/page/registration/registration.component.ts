import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { OrganizationService } from "@app/service/organization.service";
import { UserService } from "@app/service/user.service";
import { User } from "@data/models/user";
import { Router } from "@angular/router";

@Component({
	selector: "app-registration",
	templateUrl: "./registration.component.html",
	styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
	registrationForm = new FormGroup({
		firstName: new FormControl(null, [Validators.required]),
		middleName: new FormControl(null, [Validators.required]),
		lastName: new FormControl(null, [Validators.required]),
		companyName: new FormControl(null, [Validators.required]),
		position: new FormControl(null, [Validators.required])
	});

	roles = [
		{ id: "1", name: "Руководитель" },
		{ id: "2", name: "Разработчик" },
		{ id: "3", name: "Менеджер продукта" }
	];

	submitted = false;

	constructor(
		private organizationService: OrganizationService,
		private userService: UserService,
		private router: Router
	) {}

	ngOnInit(): void {}

	completeRegistration() {
		const {
			firstName,
			middleName,
			lastName,
			companyName
		} = this.registrationForm.value;
		const userId = localStorage.getItem("userId")!;

		if (this.registrationForm.invalid) {
			this.registrationForm.markAllAsTouched();
			return;
		}

		const user: Partial<User> = {
			id: userId,
			firstName,
			middleName,
			lastName
		};

		this.organizationService
			.createOrganization(companyName, userId)
			.subscribe(({ data }) => {
				this.registrationForm.reset();
				this.router.navigate(["/dashboard"]);
			})
			.add(() => (this.submitted = false));

		this.userService.updateUser(user).subscribe(
			() => {
				this.registrationForm.reset();
				this.submitted = false;
			},
			() => {
				this.submitted = false;
			}
		);
	}
}
