import { Component, Input } from "@angular/core";

@Component({
	selector: "app-user-roadmap-card",
	templateUrl: "./user-roadmap-card.component.html",
	styleUrls: ["./user-roadmap-card.component.scss"]
})
export class UserRoadmapCardComponent {
	@Input() name = "";
	@Input() progress = 0;
	@Input() startDate = new Date();
	@Input() bgColor = "";

	constructor() {}
}
