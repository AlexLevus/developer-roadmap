import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateRoadmapComponent } from "@modules/create-roadmap/page/create-roadmap/create-roadmap.component";

export const routes: Routes = [
	{
		path: "",
		component: CreateRoadmapComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CreateRoadmapRouting {}
