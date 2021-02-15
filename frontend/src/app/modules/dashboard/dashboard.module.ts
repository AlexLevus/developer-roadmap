import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { DashboardRoutingModule } from "@modules/dashboard/dashboard.routing";
import { RoadmapCardComponent } from "./page/roadmap-card/roadmap-card.component";
import { RoadmapBoardComponent } from "./page/roadmap-board/roadmap-board.component";

@NgModule({
	declarations: [RoadmapCardComponent, RoadmapBoardComponent],
	imports: [SharedModule, DashboardRoutingModule]
})
export class DashboardModule {}
