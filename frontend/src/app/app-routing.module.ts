import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "@modules/home/page/home/home.component";
import { AuthGuard } from "@app/guard/auth.guard";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { VerifyComponent } from "@modules/auth/page/verify/verify.component";

const routes: Routes = [
	{
		path: "",
		component: HomeComponent,
		canActivate: [AuthGuard],
		children: [
			{
				path: "home",
				loadChildren: () =>
					import("@modules/home/home.module").then(m => m.HomeModule)
			}
		]
	},
	{
		path: "auth",
		component: AuthLayoutComponent,
		loadChildren: () =>
			import("@modules/auth/auth.module").then(m => m.AuthModule)
	},
	{
		path: "verify/:emailToken",
		component: VerifyComponent
	},
	{ path: "**", redirectTo: "/auth/login", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {}
