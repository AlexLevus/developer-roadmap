import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective } from "@angular/forms";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"]
})
export class SelectComponent implements OnInit {
	@Input() controlName = "";
	@Input() items = [];
	@Input() label = "";

	departments: string[] = ["Департамент 1", "Департамент 2", "Департамент 3"];

	control: FormControl | undefined;

	constructor(private formGroupDir: FormGroupDirective) {}

	ngOnInit() {
		this.control = this.formGroupDir.control.get(
			this.controlName
		) as FormControl;
	}
}
