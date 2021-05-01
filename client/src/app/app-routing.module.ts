import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { AuthGuard } from "@app/guard/auth.guard";
import { CompleteRegistrationGuard } from "@app/guard/complete-registration.guard";
import { NoAuthGuard } from "@app/guard/noauth.guard";
import { RoadmapBoardComponent } from "@modules/dashboard/page/roadmap-board/roadmap-board.component";

const routes: Routes = [
	{
		path: "",
		component: ContentLayoutComponent,
		canActivate: [AuthGuard, CompleteRegistrationGuard],
		children: [
			{
				path: "dashboard",
				loadChildren: () =>
					import("@modules/dashboard/dashboard.module").then(
						(m) => m.DashboardModule
					)
			},
			{
				path: "admin",
				loadChildren: () =>
					import("@modules/admin/admin.module").then((m) => m.AdminModule)
			},
			{
				path: "roadmap/:roadmapId",
				loadChildren: () =>
					import("@modules/roadmap/roadmap.module").then((m) => m.RoadmapModule)
			},
			{
				path: "create-roadmap",
				loadChildren: () =>
					import("@modules/create-roadmap/create-roadmap.module").then(
						(m) => m.CreateRoadmapModule
					)
			},
			{
				path: "roadmaps",
				component: RoadmapBoardComponent
			}
		]
	},
	{
		path: "auth",
		canActivate: [NoAuthGuard],
		loadChildren: () =>
			import("@modules/auth/auth.module").then((m) => m.AuthModule)
	},
	{ path: "**", redirectTo: "/auth/login", pathMatch: "full" }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
	exports: [RouterModule],
	providers: []
})
export class AppRoutingModule {}
