import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "@app/service/user.service";
import { User } from "@data/models/user";

@Component({
	selector: "app-employee",
	templateUrl: "./employee.component.html",
	styleUrls: ["./employee.component.scss"]
})
export class EmployeeComponent implements OnInit {
	user!: User;
	loading = true;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const { id } = this.route.snapshot.params;
		this.userService
			.getUserById(id)
			.valueChanges.subscribe(({ data, loading }) => {
				const { user } = data;
				this.user = user;
				this.loading = loading;
			});
	}
}
