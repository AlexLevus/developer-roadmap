import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

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

	positions: string[] = [
		"Front-End Developer",
		"Backend-End Developer",
		"Product Manager",
		"UI/UX Designer",
		"QA Tester"
	];

	skills: string[] = [];

	autocompleteSkills: string[] = [
		"React",
		"Vue",
		"Spring",
		"NodeJS",
		"PostgreSQL"
	];

	departments: string[] = ["Департамент 1", "Департамент 2", "Департамент 3"];
	submitted = false;

	constructor() {}

	ngOnInit(): void {}

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
