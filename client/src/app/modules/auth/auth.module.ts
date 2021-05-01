import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";

import { AuthRoutingModule } from "./auth.routing";
import { SignFormComponent } from "app/modules/auth/page/sign-form/sign-form.component";
import { VerifyComponent } from "./page/verify/verify.component";
import { RegistrationComponent } from "./page/registration/registration.component";
import { ResetPasswordComponent } from "./page/reset-password/reset-password.component";
import { ForgotPasswordComponent } from "./page/forgot-password/forgot-password.component";

@NgModule({
	declarations: [
		SignFormComponent,
		VerifyComponent,
		RegistrationComponent,
		ResetPasswordComponent,
		ForgotPasswordComponent
	],
	imports: [AuthRoutingModule, SharedModule]
})
export class AuthModule {}
