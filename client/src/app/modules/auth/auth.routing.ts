import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignFormComponent } from "@modules/auth/page/sign-form/sign-form.component";
import { VerifyComponent } from "@modules/auth/page/verify/verify.component";
import { RegistrationComponent } from "@modules/auth/page/registration/registration.component";
import { ResetPasswordComponent } from "@modules/auth/page/reset-password/reset-password.component";
import { AuthLayoutComponent } from "../../layout/auth-layout/auth-layout.component";
import { ForgotPasswordComponent } from "@modules/auth/page/forgot-password/forgot-password.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "/auth/login",
		pathMatch: "full"
	},
	{
		path: "",
		component: AuthLayoutComponent,
		children: [
			{
				path: "login",
				component: SignFormComponent
			},
			{
				path: "reset",
				component: ForgotPasswordComponent
			},
			{
				path: "reset/:token",
				component: ResetPasswordComponent
			}
		]
	},
	{
		path: "",
		children: [
			{
				path: "verify/:emailToken",
				component: VerifyComponent
			},
			{
				path: "registration",
				component: RegistrationComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
