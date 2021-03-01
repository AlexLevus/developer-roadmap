import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignFormComponent } from "@modules/auth/page/sign-form/sign-form.component";

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
				component: SignFormComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
