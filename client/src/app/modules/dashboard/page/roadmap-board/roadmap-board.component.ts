import { Component, OnInit } from "@angular/core";
import { RoadmapService } from "@app/service/roadmap.service";
import { Roadmap } from "@data/models/roadmap";
import { MatDialog } from "@angular/material/dialog";
import { CreateRoadmapComponent } from "@modules/create-roadmap/page/create-roadmap/create-roadmap.component";
import { currentUserVar } from "../../../../graphql.module";
import { mergeMap } from "rxjs/operators";
import { ApolloQueryResult, FetchResult } from "@apollo/client";
import { RoadmapsResponse, UserRoadmapsResponse } from "@data/graphQL/types";

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
			.getUserRoadmaps(currentUserVar().id)
			.valueChanges.pipe(
				mergeMap((res: FetchResult<UserRoadmapsResponse>) => {
					if (res.data) {
						this.userRoadmapsIds = res.data?.userRoadmaps.reduce(
							(acc: string[], cur) => [...acc, cur?.id],
							[]
						);
					}

					return this.roadmapService.getRoadmapsInfo().valueChanges;
				})
			)
			.subscribe((res: ApolloQueryResult<RoadmapsResponse>) => {
				this.roadmaps = [...res.data.roadmaps].sort((a) => {
					return a.author.id === currentUserVar().id ? -1 : 1;
				});

				this.loading = res.loading;
			});
	}

	openCreateDialog() {
		this.dialog.open(CreateRoadmapComponent);
	}
}
