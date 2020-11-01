import { NgModule } from "@angular/core";

import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@NgModule({
	declarations: [],
	imports: [MatTabsModule, MatInputModule, MatProgressSpinnerModule],
	exports: [MatTabsModule, MatInputModule, MatProgressSpinnerModule]
})
export class MaterialModule {}
