import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { VerifyComponent } from "@modules/auth/page/verify/verify.component";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";

const routes: Routes = [
	{
		path: "",
		component: ContentLayoutComponent,
		//canActivate: [AuthGuard],
		children: [
			{
				path: "dashboard",
				loadChildren: () =>
					import("@modules/dashboard/dashboard.module").then(
						m => m.DashboardModule
					)
			},
			{
				path: "admin",
				loadChildren: () =>
					import("@modules/admin/admin.module").then(m => m.AdminModule)
			},
			{
				path: "roadmap/:roadmapId",
				loadChildren: () =>
					import("@modules/roadmap/roadmap.module").then(m => m.RoadmapModule)
			},
			{
				path: "create-roadmap",
				loadChildren: () =>
					import("@modules/create-roadmap/create-roadmap.module").then(
						m => m.CreateRoadmapModule
					)
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
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {}
