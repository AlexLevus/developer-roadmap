import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RoadmapBoardComponent } from "@modules/dashboard/page/roadmap-board/roadmap-board.component";

export const routes: Routes = [
	{
		path: "",
		component: RoadmapBoardComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DashboardRoutingModule {}
