import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroupDirective } from "@angular/forms";
import { SelectItem } from "@data/models/selectItem";

@Component({
	selector: "app-select",
	templateUrl: "./select.component.html",
	styleUrls: ["./select.component.scss"]
})
export class SelectComponent implements OnInit {
	@Input() controlName = "";
	@Input() items: SelectItem[] = [];
	@Input() label = "";
	@Input() multiple = false;

	control: FormControl | undefined;

	constructor(private formGroupDir: FormGroupDirective) {}

	ngOnInit() {
		this.control = this.formGroupDir.control.get(
			this.controlName
		) as FormControl;
	}
}
