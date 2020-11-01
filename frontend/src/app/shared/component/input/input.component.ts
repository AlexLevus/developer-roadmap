import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective } from "@angular/forms";

@Component({
	selector: "app-input",
	templateUrl: "./input.component.html",
	styleUrls: ["./input.component.scss"]
})
export class InputComponent implements OnInit {
	@Input() inputName = "";
	@Input() customStyle: { [klass: string]: any } | undefined;
	@Input() label = "";
	@Input() required = false;
	@Input() type = "text";
	@Input() autocomplete = "";
	@Input() placeholder = "";
	@Input() controlName = "";

	control: FormControl | undefined;

	constructor(private formGroupDir: FormGroupDirective) {}

	ngOnInit() {
		this.control = this.formGroupDir.control.get(
			this.controlName
		) as FormControl;
	}
}
