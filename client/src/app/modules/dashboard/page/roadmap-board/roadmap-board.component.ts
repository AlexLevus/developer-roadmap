import { Component, OnInit } from "@angular/core";
import { RoadmapService } from "@app/service/roadmap.service";
import { Roadmap } from "@data/models/roadmap";
import { MatDialog } from "@angular/material/dialog";
import { CreateRoadmapComponent } from "@modules/create-roadmap/page/create-roadmap/create-roadmap.component";

@Component({
	selector: "app-roadmap-board",
	templateUrl: "./roadmap-board.component.html",
	styleUrls: ["./roadmap-board.component.scss"]
})
export class RoadmapBoardComponent implements OnInit {
	roadmaps: Roadmap[] = [];
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
	}

	openCreateDialog() {
		this.dialog.open(CreateRoadmapComponent);
	}
}
