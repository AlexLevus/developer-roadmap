import { Component, OnInit } from "@angular/core";
import { RoadmapService } from "@app/service/roadmap.service";
import { Roadmap } from "@data/models/roadmap";
import { MatDialog } from "@angular/material/dialog";
import { CreateRoadmapComponent } from "@modules/create-roadmap/page/create-roadmap/create-roadmap.component";
import { currentUserVar } from "../../../../graphql.module";

@Component({
	selector: "app-roadmap-board",
	templateUrl: "./roadmap-board.component.html",
	styleUrls: ["./roadmap-board.component.scss"]
})
export class RoadmapBoardComponent implements OnInit {
	roadmaps: Roadmap[] = [];
	userRoadmapsIds: string[] = [];
	loading = true;

	constructor(
		private roadmapService: RoadmapService,
		public dialog: MatDialog
	) {}

	ngOnInit(): void {
		this.roadmapService
			.getRoadmaps()
			.valueChanges.subscribe(({ data, loading }) => {
				const { roadmaps } = data;
				this.roadmaps = roadmaps;
				this.loading = loading;
			});

		this.roadmapService
			.getUserRoadmaps(currentUserVar().id)
			.valueChanges.subscribe(({ data }) => {
				this.userRoadmapsIds = data.userRoadmaps.reduce(
					(acc: string[], cur) => [...acc, cur?.id],
					[]
				);
			});
	}

	openCreateDialog() {
		this.dialog.open(CreateRoadmapComponent);
	}
}
