import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective } from "@angular/forms";

@Component({
	selector: "app-checkbox",
	templateUrl: "./checkbox.component.html",
	styleUrls: ["./checkbox.component.scss"]
})
export class CheckboxComponent implements OnInit {
	@Input() controlName = "";
	@Input() label = "";
	@Input() labelPosition: "after" | "before" = "after";
	control: FormControl | undefined;

	constructor(private formGroupDir: FormGroupDirective) {}

	ngOnInit() {
		this.control = this.formGroupDir.control.get(
			this.controlName
		) as FormControl;
	}
}
