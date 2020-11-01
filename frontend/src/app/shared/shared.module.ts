import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./material.module";

import { InputComponent } from "./component/input/input.component";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
	declarations: [InputComponent],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,

		MaterialModule,

		InputComponent
	]
})
export class SharedModule {
	constructor() {}
}
