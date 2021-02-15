import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";

import { AuthRoutingModule } from "./auth.routing";
import { SignFormComponent } from "app/modules/auth/page/sign-form/sign-form.component";
import { VerifyComponent } from "./page/verify/verify.component";

@NgModule({
	declarations: [SignFormComponent, VerifyComponent],
	imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
