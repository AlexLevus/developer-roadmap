import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateEmployeeComponent } from "@modules/admin/page/create-employee/create-employee.component";
import { CreateDepartmentComponent } from "@modules/admin/page/create-department/create-department.component";
import { DepartmentBoardComponent } from "@modules/admin/page/department-board/department-board.component";
import { DepartmentComponent } from "@modules/admin/page/department/department.component";

export const routes: Routes = [
	{
		path: "create-employee",
		component: CreateEmployeeComponent
	},
	{
		path: "create-department",
		component: CreateDepartmentComponent
	},
	{
		path: "department-board",
		component: DepartmentBoardComponent
	},
	{
		path: "department/:id",
		component: DepartmentComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
