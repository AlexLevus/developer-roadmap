import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "@app/service/auth.service";

@Injectable()
export class CompleteRegistrationGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(): boolean {
		if (this.authService) {
			return true;
		} else {
			this.router.navigate(["/registration"]);
			return false;
		}
	}
}
