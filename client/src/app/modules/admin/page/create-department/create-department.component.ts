import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DepartmentService } from "@app/service/department.service";
import { currentUserVar } from "../../../../graphql.module";
import { MatDialogRef } from "@angular/material/dialog";
import { UserService } from "@app/service/user.service";
import { SelectItem } from "@data/models/selectItem";
import { map } from "rxjs/operators";
import { TuiNotification, TuiNotificationsService } from "@taiga-ui/core";

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
	loading = false;

	users: SelectItem[] = [];

	constructor(
		private userService: UserService,
		private departmentService: DepartmentService,
		private dialogRef: MatDialogRef<CreateDepartmentComponent>,
		@Inject(TuiNotificationsService)
		private readonly notificationsService: TuiNotificationsService
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

		this.loading = true;

		const { name, description, manager } = this.departmentForm.value;

		this.departmentService
			.createDepartment(name, description, currentUserVar().orgId, manager)
			.subscribe(({ data }) => {
				this.dialogRef.close();
				this.notificationsService
					.show("Департамент успешно создан!", {
						status: TuiNotification.Success
					})
					.subscribe();
			})
			.add(() => (this.loading = false));
	}
}
