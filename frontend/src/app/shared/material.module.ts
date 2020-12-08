import { NgModule } from "@angular/core";

import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";

@NgModule({
	declarations: [],
	imports: [
		MatTabsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatTableModule
	],
	exports: [
		MatTabsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatTableModule
	]
})
export class MaterialModule {}
