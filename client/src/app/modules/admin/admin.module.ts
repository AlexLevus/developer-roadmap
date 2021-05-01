import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "@modules/admin/admin.routing";
import { SharedModule } from "@shared/shared.module";
import { CreateEmployeeComponent } from "./page/create-employee/create-employee.component";
import { CreateDepartmentComponent } from "./page/create-department/create-department.component";
import { DepartmentBoardComponent } from "./page/department-board/department-board.component";
import { DepartmentComponent } from "./page/department/department.component";
import { EmployeesBoardComponent } from "./page/employees-board/employees-board.component";
import { EmployeeComponent } from "./page/employee/employee.component";
import { MatSortModule } from "@angular/material/sort";

@NgModule({
	declarations: [
		CreateEmployeeComponent,
		CreateDepartmentComponent,
		DepartmentBoardComponent,
		DepartmentComponent,
		EmployeesBoardComponent,
		EmployeeComponent
	],
	imports: [SharedModule, AdminRoutingModule, MatSortModule]
})
export class AdminModule {}
