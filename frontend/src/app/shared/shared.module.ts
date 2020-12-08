import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MaterialModule } from "./material.module";

import { InputComponent } from "@shared/component/input/input.component";
import { ButtonComponent } from "@shared/component/button/button.component";

@NgModule({
	imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
	declarations: [InputComponent, ButtonComponent],
	exports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,

		MaterialModule,

		InputComponent,
		ButtonComponent
	]
})
export class SharedModule {
	constructor() {}
}
