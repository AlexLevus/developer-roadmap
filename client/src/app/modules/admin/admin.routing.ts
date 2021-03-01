import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateEmployeeComponent } from "@modules/admin/page/create-employee/create-employee.component";

export const routes: Routes = [
	{
		path: "create-employee",
		component: CreateEmployeeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
