import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "@modules/auth/page/login-page/login-page.component";

const routes: Routes = [
	{
		path: "",
		redirectTo: "/auth/login",
		pathMatch: "full"
	},
	{
		path: "",
		children: [
			{
				path: "login",
				component: LoginPageComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
