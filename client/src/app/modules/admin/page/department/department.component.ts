import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DepartmentService } from "@app/service/department.service";
import { Department } from "@data/models/department";

@Component({
	selector: "app-department",
	templateUrl: "./department.component.html",
	styleUrls: ["./department.component.scss"]
})
export class DepartmentComponent implements OnInit {
	department!: Department;
	loading = true;

	constructor(
		private departmentService: DepartmentService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const { id } = this.route.snapshot.params;
		this.departmentService
			.getDepartment(id)
			.valueChanges.subscribe(({ data, loading }) => {
				const { department } = data;
				console.log(department);
				this.department = department;
				this.loading = loading;
			});
	}
}
