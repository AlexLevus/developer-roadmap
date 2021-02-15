import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { map, startWith } from "rxjs/operators";
import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import { FormControl, FormGroupDirective } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";

@Component({
	selector: "app-chips",
	templateUrl: "./chips.component.html",
	styleUrls: ["./chips.component.scss"]
})
export class ChipsComponent implements OnInit {
	@ViewChild("input") input!: ElementRef<HTMLInputElement>;
	@ViewChild("auto") matAutocomplete!: MatAutocomplete;

	@Input() label = "";
	@Input() items!: string[];
	@Input() autocompleteItems!: string[];
	@Input() controlName!: string;

	itemsControl!: FormControl;
	visible = true;
	selectable = true;
	removable = true;
	inputControl = new FormControl();
	filteredItems: Observable<string[]>;

	constructor(private formGroupDir: FormGroupDirective) {
		this.filteredItems = this.inputControl.valueChanges.pipe(
			startWith(null),
			map((item: string | null) =>
				item ? this._filter(item) : this.autocompleteItems.slice()
			)
		);
	}

	ngOnInit() {
		this.itemsControl = this.formGroupDir.control.get(
			this.controlName
		) as FormControl;
	}

	add(event: MatChipInputEvent): void {
		const input = event.input;
		const value = event.value;

		if (this.items.find(item => item === value) && input) {
			input.value = "";
			this.inputControl.setValue(null);
			return;
		}

		if ((value || "").trim()) {
			this.items.push(value.trim());
		}

		if (input) {
			input.value = "";
		}

		this.inputControl.setValue(null);
		this.itemsControl.setValue(this.items);
	}

	remove(item: string): void {
		const index = this.items.indexOf(item);

		if (index >= 0) {
			this.items.splice(index, 1);
		}

		this.itemsControl.setValue(this.items);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		const value = event.option.viewValue;
		this.items.push(value);
		this.input.nativeElement.value = "";
		this.inputControl.setValue(null);
		this.itemsControl.setValue(this.items);
	}

	private _filter(value: string): string[] {
		const filterValue = value.toLowerCase();

		return this.autocompleteItems.filter(
			item => item.toLowerCase().indexOf(filterValue) === 0
		);
	}
}
