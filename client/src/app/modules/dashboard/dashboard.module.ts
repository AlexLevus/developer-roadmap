import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { DashboardRoutingModule } from "@modules/dashboard/dashboard.routing";
import { UserRoadmapCardComponent } from "./page/user-roadmap-card/user-roadmap-card.component";
import { UserRoadmapBoardComponent } from "./page/user-roadmap-board/user-roadmap-board.component";
import { RoadmapBoardComponent } from "@modules/dashboard/page/roadmap-board/roadmap-board.component";

@NgModule({
	declarations: [
		UserRoadmapCardComponent,
		UserRoadmapBoardComponent,
		RoadmapBoardComponent
	],
	imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
