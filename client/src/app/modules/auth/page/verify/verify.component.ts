import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "@app/service/auth.service";

@Component({
	selector: "app-verify",
	templateUrl: "./verify.component.html",
	styleUrls: ["./verify.component.scss"]
})
export class VerifyComponent implements OnInit {
	isVerified = false;
	isLoading = true;
	error = "";

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		const token: string = this.route.snapshot.params.emailToken;
		this.authService
			.verify(token)
			.subscribe(
				(res) => {
					this.isVerified = true;
				},
				(error) => {
					this.error = error.message;
					console.log(this.error);
				}
			)
			.add(() => (this.isLoading = false));
	}
}
