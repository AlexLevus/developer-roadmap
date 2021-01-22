import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./material.module";

import { InputComponent } from "@shared/component/input/input.component";
import { ButtonComponent } from "@shared/component/button/button.component";
import { StateComponent } from "./component/state/state.component";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
	declarations: [InputComponent, ButtonComponent, StateComponent],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,

		MaterialModule,

		InputComponent,
		ButtonComponent,
		StateComponent
	]
})
export class SharedModule {
	constructor() {}
}
