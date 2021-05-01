import { Component, OnInit } from "@angular/core";
import { RoadmapService } from "@app/service/roadmap.service";
import { currentUserVar } from "../../../../graphql.module";
import { Roadmap } from "@data/models/roadmap";

@Component({
	selector: "app-user-roadmap-board",
	templateUrl: "./user-roadmap-board.component.html",
	styleUrls: ["./user-roadmap-board.component.scss"]
})
export class UserRoadmapBoardComponent implements OnInit {
	currentDate = new Date();
	roadmaps: Roadmap[] = [];

	constructor(private roadmapService: RoadmapService) {}

	// TODO: попробуй задать цвета через классы (см ButtonComponent)

	ngOnInit(): void {
		this.roadmapService
			.getUserRoadmaps(currentUserVar().id)
			.valueChanges.subscribe(({ data }) => {
				this.roadmaps = data.userRoadmaps;
				console.log(this.roadmaps);
			});
	}
}
