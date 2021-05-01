import { Component, Input } from "@angular/core";
import { Roadmap } from "@data/models/roadmap";
import { RoadmapService } from "@app/service/roadmap.service";
import { currentUserVar } from "../../../../graphql.module";

@Component({
	selector: "app-user-roadmap-card",
	templateUrl: "./user-roadmap-card.component.html",
	styleUrls: ["./user-roadmap-card.component.scss"]
})
export class UserRoadmapCardComponent {
	@Input() roadmap!: Roadmap;
	@Input() progress = 0;
	@Input() startDate = new Date();

	constructor(private roadmapService: RoadmapService) {}

	removeUserRoadmap() {
		this.roadmapService
			.removeRoadmapFromUser(this.roadmap.id, currentUserVar().id)
			.subscribe((data) => {
				console.log(data);
			});
	}
}
