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
	employees!: User[];
	loading = true;
	readonly columns = ["name", "department", "position", "email", "status"];

	constructor(private userService: UserService, public dialog: MatDialog) {}

	ngOnInit(): void {
		this.userService
			.getOrganizationUsers(currentUserVar().orgId)
			.valueChanges.subscribe(({ data, loading }) => {
				const { organizationUsers } = data;
				this.employees = organizationUsers.filter((item) => item.department);
				this.loading = loading;
			});
	}

	openCreateDialog() {
		this.dialog.open(CreateEmployeeComponent, {
			height: "95%"
		});
	}
}
