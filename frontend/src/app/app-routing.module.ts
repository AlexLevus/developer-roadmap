import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPageComponent } from "@modules/auth/page/login-page/login-page.component";
import { HomeComponent } from "@modules/home/page/home/home.component";
import { AuthGuard } from "@app/guard/auth.guard";
import { NoAuthGuard } from "@app/guard/noauth.guard";

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
		component: LoginPageComponent,
		canActivate: [NoAuthGuard],
		loadChildren: () =>
			import("@modules/auth/auth.module").then(m => m.AuthModule)
	},
	{ path: "**", redirectTo: "/auth/login", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {}
