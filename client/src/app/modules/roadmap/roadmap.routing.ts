import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { RoadmapComponent } from "@modules/roadmap/page/roadmap/roadmap.component";

const routes: Routes = [
	{
		path: "",
		component: RoadmapComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RoadmapRoutingModule {}
