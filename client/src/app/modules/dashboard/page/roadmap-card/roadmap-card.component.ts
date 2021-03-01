import { Component, Input } from "@angular/core";

@Component({
	selector: "app-roadmap-card",
	templateUrl: "./roadmap-card.component.html",
	styleUrls: ["./roadmap-card.component.scss"]
})
export class RoadmapCardComponent {
	@Input() name = "";
	@Input() progress = 0;
	@Input() startDate = new Date();
	@Input() bgColor = "";

	constructor() {}
}
