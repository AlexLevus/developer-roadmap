import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { UserRoadmapBoardComponent } from "@modules/dashboard/page/user-roadmap-board/user-roadmap-board.component";

export const routes: Routes = [
	{
		path: "",
		component: UserRoadmapBoardComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {}
