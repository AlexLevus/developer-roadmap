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
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDialogModule } from "@angular/material/dialog";
import { TuiFieldErrorModule, TuiIslandModule } from "@taiga-ui/kit";
import {
	TuiButtonModule,
	TuiLinkModule,
	TuiPrimitiveTextfieldModule,
	TuiScrollbarModule,
	TuiSvgModule,
	TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { TuiTableModule } from "@taiga-ui/addon-table";
import { TuiCheckboxModule } from "@taiga-ui/kit";
import { TuiCheckboxBlockModule } from "@taiga-ui/kit";
import {
	TuiNotificationsModule,
	TuiRootModule,
	TuiTooltipModule,
	TuiHintModule,
	TuiPrimitiveCheckboxModule,
	iconsPathFactory,
	TUI_ICONS_PATH
} from "@taiga-ui/core";
import { TuiInputModule } from "@taiga-ui/kit";

@NgModule({
	declarations: [],
	imports: [
		TuiIslandModule,
		TuiButtonModule,
		TuiTableModule,
		TuiLinkModule,
		TuiCheckboxModule,
		TuiCheckboxBlockModule,
		TuiTooltipModule,
		TuiHintModule,
		TuiPrimitiveCheckboxModule,
		TuiNotificationsModule,
		TuiRootModule,
		TuiFieldErrorModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
		TuiSvgModule,
		TuiScrollbarModule,
		TuiPrimitiveTextfieldModule,

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
		MatAutocompleteModule,
		MatGridListModule,
		MatDialogModule
	],
	exports: [
		TuiIslandModule,
		TuiButtonModule,
		TuiTableModule,
		TuiLinkModule,
		TuiCheckboxModule,
		TuiCheckboxBlockModule,
		TuiTooltipModule,
		TuiHintModule,
		TuiPrimitiveCheckboxModule,
		TuiNotificationsModule,
		TuiRootModule,
		TuiFieldErrorModule,
		TuiInputModule,
		TuiTextfieldControllerModule,
		TuiSvgModule,
		TuiScrollbarModule,
		TuiPrimitiveTextfieldModule,

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
		MatAutocompleteModule,
		MatGridListModule,
		MatDialogModule
	],
	providers: [
		{
			provide: TUI_ICONS_PATH,
			useValue: iconsPathFactory("assets/taiga-ui/icons/")
		}
	]
})
export class MaterialModule {}
