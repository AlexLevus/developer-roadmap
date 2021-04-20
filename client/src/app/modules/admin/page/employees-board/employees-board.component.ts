import { Component, OnInit } from "@angular/core";
import { User } from "@data/models/user";
import { UserService } from "@app/service/user.service";
import { currentUserVar } from "../../../../graphql.module";
import { MatDialog } from "@angular/material/dialog";
import { CreateEmployeeComponent } from "@modules/admin/page/create-employee/create-employee.component";

@Component({
	selector: "app-employees-board",
	templateUrl: "./employees-board.component.html",
	styleUrls: ["./employees-board.component.scss"]
})
export class EmployeesBoardComponent implements OnInit {
	displayedColumns: string[] = ["name", "department", "position"];
	employees!: User[];
	loading = true;

	constructor(private userService: UserService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.userService
			.getOrganizationUsers(currentUserVar().orgId)
			.valueChanges.subscribe(({ data, loading }) => {
				const { organizationUsers } = data;
				this.employees = organizationUsers;
				this.loading = loading;
			});
	}

	openCreateDialog() {
		this.dialog.open(CreateEmployeeComponent, {
			height: "95%"
		});
	}
}
