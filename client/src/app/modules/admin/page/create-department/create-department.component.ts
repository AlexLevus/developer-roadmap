import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "@data/models/user";
import { DepartmentService } from "@app/service/department.service";

@Component({
	selector: "app-create-department",
	templateUrl: "./create-department.component.html",
	styleUrls: ["./create-department.component.scss"]
})
export class CreateDepartmentComponent implements OnInit {
	departmentForm = new FormGroup({
		name: new FormControl(null, [Validators.required]),
		description: new FormControl(null, [Validators.required])
	});

	departments: string[] = ["Департамент 1", "Департамент 2", "Департамент 3"];
	submitted = false;

	users: User[] = [];

	constructor(private departmentService: DepartmentService) {}

	ngOnInit(): void {}

	createDepartment() {
		if (this.departmentForm.invalid) {
			this.departmentForm.markAllAsTouched();
			return;
		}

		const { name, description } = this.departmentForm.value;

		// TODO прокинуть orgId

		this.departmentService
			.createDepartment(name, description, "1")
			.subscribe((result) => {
				console.log(result.data);
			});
	}
}
