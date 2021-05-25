import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { OrganizationService } from "@app/service/organization.service";
import { UserService } from "@app/service/user.service";
import { User } from "@data/models/user";
import { Router } from "@angular/router";
import { mergeMap } from "rxjs/operators";
import { Position } from "@data/models/position";
import { currentUserVar } from "../../../../graphql.module";

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

	positions: Position[] = [];

	submitted = false;

	constructor(
		private organizationService: OrganizationService,
		private userService: UserService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.userService.getPositions().valueChanges.subscribe(({ data }) => {
			this.positions = data.positions;
		});
	}

	completeRegistration() {
		const {
			firstName,
			middleName,
			lastName,
			companyName,
			position
		} = this.registrationForm.value;

		if (this.registrationForm.invalid) {
			this.registrationForm.markAllAsTouched();
			return;
		}

		this.organizationService
			.createOrganization(companyName, currentUserVar().id)
			.pipe(
				mergeMap(({ data }) => {
					const user: Partial<User> = {
						id: currentUserVar().id,
						orgId: data?.createOrganization.id,
						positionId: position,
						firstName,
						middleName,
						lastName
					};
					return this.userService.updateUser(user);
				})
			)
			.subscribe(({ data }) => {
				this.registrationForm.reset();
				this.router.navigate(["/dashboard"]);
			})
			.add(() => (this.submitted = false));
	}
}
