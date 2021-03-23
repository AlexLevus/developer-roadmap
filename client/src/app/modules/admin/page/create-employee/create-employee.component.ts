import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { DepartmentService } from "@app/service/department.service";
import { Department } from "@data/models/department";
import { currentUserVar } from "../../../../graphql.module";
import { UserService } from "@app/service/user.service";
import { Position } from "@data/models/position";
import { User } from "@data/models/user";
import { Skill } from "@data/models/skill";

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

	skills: Skill[] = [];

	autocompleteSkills: Skill[] = [];

	departments: Department[] = [];
	positions: Position[] = [];

	submitted = false;

	constructor(
		private departmentService: DepartmentService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		this.departmentService
			.getOrganizationDepartments(currentUserVar().orgId)
			.valueChanges.subscribe(({ data }) => {
				this.departments = data.organizationDepartments;
			});

		this.userService.getPositions().valueChanges.subscribe(({ data }) => {
			this.positions = data.positions;
		});

		this.userService.getSkills().valueChanges.subscribe(({ data }) => {
			this.autocompleteSkills = data.skills;
		});
	}

	createEmployee() {
		console.log(this.employeeForm.value);
		if (this.employeeForm.invalid) {
			this.employeeForm.markAllAsTouched();
			return;
		}

		const {
			firstName,
			lastName,
			middleName,
			email,
			password,
			position,
			department,
			skills
		} = this.employeeForm.value;

		const user: Partial<User> = {
			email,
			password,
			firstName,
			lastName,
			middleName,
			skills,
			positionId: position,
			departmentId: department,
			orgId: currentUserVar().orgId
		};

		this.userService.createUser(user).subscribe(({ data }) => {
			console.log(data);
		});
	}

	generatePassword(): void {
		// const password = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
		this.employeeForm.controls.password.setValue("15091992");
	}
}
