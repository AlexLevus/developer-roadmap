import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./material.module";

import { InputComponent } from "@shared/component/input/input.component";
import { ButtonComponent } from "@shared/component/button/button.component";
import { StateComponent } from "./component/state/state.component";
import { TreeComponent } from "./component/tree/tree.component";
import { SelectComponent } from "./component/select/select.component";
import { ChipsComponent } from "./component/chips/chips.component";
import { CheckboxComponent } from "./component/checkbox/checkbox.component";
import { CardComponent } from "./component/card/card.component";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		MaterialModule
	],
	declarations: [
		InputComponent,
		ButtonComponent,
		StateComponent,
		TreeComponent,
		SelectComponent,
		ChipsComponent,
		CheckboxComponent,
		CardComponent
	],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,

		MaterialModule,

		InputComponent,
		ButtonComponent,
		StateComponent,
		TreeComponent,
		SelectComponent,
		ChipsComponent,
		CheckboxComponent,
		CardComponent
	]
})
export class SharedModule {
	constructor() {}
}
