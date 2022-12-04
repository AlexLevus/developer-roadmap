import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { currentUserVar } from "../../graphql.module";

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private router: Router) {}

	canActivate(): boolean {
		if (currentUserVar().isAdmin) {
			return true;
		} else {
			this.router.navigate(["/dashboard"]);
			return false;
		}
	}
}
