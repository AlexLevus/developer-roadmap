import { Component, Input, OnInit } from "@angular/core";

@Component({
	selector: "app-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"]
})
export class ButtonComponent implements OnInit {
	@Input() text = "";
	@Input() type = "button";
	@Input() size = "";
	@Input() submitted = false;

	constructor() {}

	ngOnInit(): void {}
}
