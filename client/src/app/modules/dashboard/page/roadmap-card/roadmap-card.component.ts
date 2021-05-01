import { Component, Input, OnInit } from "@angular/core";
import { User } from "@data/models/user";
import { RoadmapService } from "@app/service/roadmap.service";
import { currentUserVar } from "../../../../graphql.module";
import { Roadmap } from "@data/models/roadmap";

@Component({
	selector: "app-roadmap-card",
	templateUrl: "./roadmap-card.component.html",
	styleUrls: ["./roadmap-card.component.scss"]
})
export class RoadmapCardComponent implements OnInit {
	@Input() roadmap!: Roadmap;
	@Input() owner?: Partial<User>;
	@Input() isRoadmapAlreadyAdded = false;

	constructor(private roadmapService: RoadmapService) {}

	ngOnInit(): void {}

	addRoadmap() {
		this.roadmapService
			.addRoadmapToUser(this.roadmap.id, currentUserVar().id)
			.subscribe((data) => {});
	}

	removeRoadmap() {
		this.roadmapService
			.removeRoadmapFromUser(this.roadmap.id, currentUserVar().id)
			.subscribe((data) => {});
	}
}
