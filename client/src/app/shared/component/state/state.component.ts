import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
	selector: "app-state",
	templateUrl: "./state.component.html",
	styleUrls: ["./state.component.scss"],
	encapsulation: ViewEncapsulation.ShadowDom
})
export class StateComponent implements OnInit {
	@Input() message = "";
	@Input() state = "";

	constructor() {}

	ngOnInit(): void {}
}
