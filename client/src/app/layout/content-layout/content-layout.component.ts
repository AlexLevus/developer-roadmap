import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
	selector: "app-content-layout",
	templateUrl: "./content-layout.component.html",
	styleUrls: ["./content-layout.component.scss"]
})
export class ContentLayoutComponent implements OnInit {
	constructor(private router: Router) {}

	ngOnInit(): void {}

	logout() {
		localStorage.clear();
		this.router.navigate(["/"]);
	}
}
