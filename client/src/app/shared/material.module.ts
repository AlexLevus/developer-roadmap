import { NgModule } from "@angular/core";

import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatMenuModule } from "@angular/material/menu";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
	declarations: [],
	imports: [
		MatTabsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatSelectModule,
		MatCheckboxModule,
		MatTreeModule,
		MatIconModule,
		MatButtonModule,
		MatProgressBarModule,
		MatMenuModule,
		MatChipsModule,
		MatAutocompleteModule
	],
	exports: [
		MatTabsModule,
		MatInputModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatSelectModule,
		MatCheckboxModule,
		MatTreeModule,
		MatIconModule,
		MatButtonModule,
		MatProgressBarModule,
		MatMenuModule,
		MatChipsModule,
		MatAutocompleteModule
	]
})
export class MaterialModule {}
