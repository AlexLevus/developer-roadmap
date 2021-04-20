import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { DepartmentService } from "@app/service/department.service";
import { currentUserVar } from "../../../../graphql.module";
import { Department } from "@data/models/department";
import { CreateDepartmentComponent } from "@modules/admin/page/create-department/create-department.component";

@Component({
	selector: "app-department-board",
	templateUrl: "./department-board.component.html",
	styleUrls: ["./department-board.component.scss"]
})
export class DepartmentBoardComponent implements OnInit {
	departments: Department[] = [];
	loading = true;

	constructor(
		private departmentService: DepartmentService,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.departmentService
			.getOrganizationDepartments(currentUserVar().orgId)
			.valueChanges.subscribe(({ data, loading }) => {
				const { organizationDepartments } = data;
				this.departments = organizationDepartments;
				this.loading = loading;
			});
	}

	openCreateDialog() {
		this.dialog.open(CreateDepartmentComponent);
	}
}
