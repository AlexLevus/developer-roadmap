import { Component, OnInit } from "@angular/core";

@Component({
	selector: "app-roadmap-board",
	templateUrl: "./roadmap-board.component.html",
	styleUrls: ["./roadmap-board.component.scss"]
})
export class RoadmapBoardComponent implements OnInit {
	currentDate = new Date();

	constructor() {}

	// TODO: попробуй задать цвета через классы (см ButtonComponent)

	ngOnInit(): void {}
}
