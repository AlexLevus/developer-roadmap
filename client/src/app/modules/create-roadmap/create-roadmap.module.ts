import { NgModule } from "@angular/core";
import { CreateRoadmapComponent } from "./page/create-roadmap/create-roadmap.component";
import { CreateRoadmapRouting } from "@modules/create-roadmap/create-roadmap.routing";
import { SharedModule } from "@shared/shared.module";

@NgModule({
	declarations: [CreateRoadmapComponent],
	imports: [SharedModule, CreateRoadmapRouting]
})
export class CreateRoadmapModule {}
