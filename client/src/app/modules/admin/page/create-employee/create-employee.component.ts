import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DepartmentService } from "@app/service/department.service";
import { Department } from "@data/models/department";

@Component({
	selector: "app-create-employee",
	templateUrl: "./create-employee.component.html",
	styleUrls: ["./create-employee.component.scss"]
})
export class CreateEmployeeComponent implements OnInit {
	employeeForm = new FormGroup({
		firstName: new FormControl(null, [Validators.required]),
		lastName: new FormControl(null, [Validators.required]),
		middleName: new FormControl(null, [Validators.required]),
		position: new FormControl(null, [Validators.required]),
		department: new FormControl(null, [Validators.required]),
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [
			Validators.required,
			Validators.minLength(8)
		]),
		skills: new FormControl(null)
	});

	positions = [
		{ id: "1", name: "Front-End Developer" },
		{ id: "2", name: "Backend-End Developer" },
		{ id: "3", name: "Product Manager" }
	];

	skills: string[] = [];

	autocompleteSkills: string[] = [
		"React",
		"Vue",
		"Spring",
		"NodeJS",
		"PostgreSQL"
	];

	departments: Department[] = [];
	submitted = false;

	constructor(private departmentService: DepartmentService) {}

	ngOnInit(): void {
		this.departmentService
			.getOrganizationDepartments("1")
			.valueChanges.subscribe((result) => {
				console.log(result.data.organizationDepartments);
				this.departments = result.data.organizationDepartments;
			});
	}

	createEmployee() {
		console.log(this.employeeForm.value);
		if (this.employeeForm.invalid) {
			this.employeeForm.markAllAsTouched();
			return;
		}
	}

	generatePassword(): void {
		// const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
		this.employeeForm.controls.password.setValue("15091992");
	}
}
