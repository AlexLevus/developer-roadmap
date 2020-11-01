import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { AuthRoutingModule } from "./auth.routing";
import { SignFormComponent } from "app/modules/auth/page/sign-form/sign-form.component";
import { LoginPageComponent } from "app/modules/auth/page/login-page/login-page.component";

@NgModule({
	declarations: [SignFormComponent, LoginPageComponent],
	imports: [CommonModule, AuthRoutingModule, SharedModule],
	exports: [LoginPageComponent]
})
export class AuthModule {}
