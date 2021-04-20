import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CreateEmployeeComponent } from "@modules/admin/page/create-employee/create-employee.component";
import { CreateDepartmentComponent } from "@modules/admin/page/create-department/create-department.component";
import { DepartmentBoardComponent } from "@modules/admin/page/department-board/department-board.component";
import { DepartmentComponent } from "@modules/admin/page/department/department.component";
import { EmployeesBoardComponent } from "@modules/admin/page/employees-board/employees-board.component";
import { EmployeeComponent } from "@modules/admin/page/employee/employee.component";

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
		path: "employees-board",
		component: EmployeesBoardComponent
	},
	{
		path: "department/:id",
		component: DepartmentComponent
	},
	{
		path: "employee/:id",
		component: EmployeeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminRoutingModule {}
