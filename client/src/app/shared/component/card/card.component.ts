import { Component, Input, OnInit } from "@angular/core";
import { User } from "@data/models/user";

@Component({
	selector: "app-card",
	templateUrl: "./card.component.html",
	styleUrls: ["./card.component.scss"]
})
export class CardComponent implements OnInit {
	@Input() title = "";
	@Input() description = "";
	@Input() to = "";
	@Input() owner?: Partial<User>;

	constructor() {}

	ngOnInit(): void {}
}
