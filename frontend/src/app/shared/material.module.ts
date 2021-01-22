import { NgModule } from "@angular/core";

import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
	MatTreeModule,
	MatTreeNode,
	MatNestedTreeNode
} from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";

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
		MatTreeNode,
		MatNestedTreeNode
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
		MatTreeNode,
		MatNestedTreeNode
	]
})
export class MaterialModule {}
