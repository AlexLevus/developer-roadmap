import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { map, startWith } from "rxjs/operators";
import {
	MatAutocomplete,
	MatAutocompleteSelectedEvent
} from "@angular/material/autocomplete";
import { FormControl, FormGroupDirective } from "@angular/forms";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { SelectItem } from "@data/models/selectItem";

@Component({
	selector: "app-chips",
	templateUrl: "./chips.component.html",
	styleUrls: ["./chips.component.scss"]
})
export class ChipsComponent implements OnInit {
	@ViewChild("input") input!: ElementRef<HTMLInputElement>;
	@ViewChild("auto") matAutocomplete!: MatAutocomplete;

	@Input() label = "";
	@Input() items: SelectItem[] = [];
	@Input() autocompleteItems: SelectItem[] = [];
	@Input() controlName!: string;

	itemsControl!: FormControl;
	visible = true;
	selectable = true;
	removable = true;
	inputControl = new FormControl();
	filteredItems: Observable<SelectItem[]>;

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
		const name = event.value.trim();

		if (this.items.find((item) => item.name === name) && input) {
			input.value = "";
			this.inputControl.setValue(null);
			return;
		}

		const existedItem = this.autocompleteItems.find((el) => el.name === name);
		const id = existedItem ? existedItem.id : null;

		if ((name || "").trim()) {
			this.items.push({ id, name });
		}

		if (input) {
			input.value = "";
		}

		this.inputControl.setValue(null);
		this.itemsControl.setValue(this.items);
	}

	remove(item: SelectItem): void {
		const index = this.items.map((el) => el.name).indexOf(item.name);

		if (index >= 0) {
			this.items.splice(index, 1);
		}

		this.itemsControl.setValue(this.items);
	}

	selected(event: MatAutocompleteSelectedEvent): void {
		if (this.items.find((item) => item.name === event.option.viewValue)) {
			this.input.nativeElement.value = "";
			this.inputControl.setValue(null);
			return;
		}

		const value = {
			id: event.option.value,
			name: event.option.viewValue
		};
		this.items.push(value);
		this.input.nativeElement.value = "";
		this.inputControl.setValue(null);
		this.itemsControl.setValue(this.items);
	}

	private _filter(value: string): SelectItem[] {
		const filterValue = value.toLowerCase();

		return this.autocompleteItems.filter(
			(item) => item.name.toLowerCase().indexOf(filterValue) === 0
		);
	}
}
