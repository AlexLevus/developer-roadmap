import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DepartmentService } from "@app/service/department.service";
import { currentUserVar } from "../../../../graphql.module";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "@app/service/user.service";
import { SelectItem } from "@data/models/selectItem";
import { map } from "rxjs/operators";

@Component({
	selector: "app-create-department",
	templateUrl: "./create-department.component.html",
	styleUrls: ["./create-department.component.scss"]
})
export class CreateDepartmentComponent implements OnInit {
	departmentForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required]),
		manager: new FormControl(null, [Validators.required])
	});

	submitted = false;

	users: SelectItem[] = [];

	constructor(
		private userService: UserService,
		private departmentService: DepartmentService,
		private dialogRef: MatDialogRef<CreateDepartmentComponent>
	) {}

	ngOnInit(): void {
		this.userService
			.getOrganizationUsers(currentUserVar().orgId)
			.valueChanges.pipe(
				map(({ data }) => {
					return data.organizationUsers.map((user) => ({
						id: user.id,
						name: `${user.firstName} ${user.lastName}`
					}));
				})
			)
			.subscribe((users) => {
				this.users = users;
			});
	}

	createDepartment() {
		if (this.departmentForm.invalid) {
			this.departmentForm.markAllAsTouched();
			return;
		}

		const { name, description, manager } = this.departmentForm.value;

		this.departmentService
			.createDepartment(name, description, currentUserVar().orgId, manager)
			.subscribe(({ data }) => {
				console.log(data);
				this.dialogRef.close();
			});
	}
}
