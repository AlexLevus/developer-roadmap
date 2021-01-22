import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";

import { AuthRoutingModule } from "./auth.routing";
import { SignFormComponent } from "app/modules/auth/page/sign-form/sign-form.component";
import { VerifyComponent } from "./page/verify/verify.component";

@NgModule({
	declarations: [SignFormComponent, VerifyComponent],
	imports: [CommonModule, AuthRoutingModule, SharedModule],
	exports: []
})
export class AuthModule {}
