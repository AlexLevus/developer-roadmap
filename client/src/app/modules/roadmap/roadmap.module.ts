import { NgModule } from "@angular/core";
import { RoadmapComponent } from "./page/roadmap/roadmap.component";
import { SharedModule } from "@shared/shared.module";
import { RoadmapRoutingModule } from "@modules/roadmap/roadmap.routing";

@NgModule({
	declarations: [RoadmapComponent],
	imports: [SharedModule, RoadmapRoutingModule]
})
export class RoadmapModule {}
