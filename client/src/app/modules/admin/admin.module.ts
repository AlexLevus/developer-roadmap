import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "@modules/admin/admin.routing";
import { SharedModule } from "@shared/shared.module";
import { CreateEmployeeComponent } from "./page/create-employee/create-employee.component";
import { CreateDepartmentComponent } from "./page/create-department/create-department.component";
import { DepartmentBoardComponent } from "./page/department-board/department-board.component";
import { DepartmentComponent } from './page/department/department.component';

@NgModule({
	declarations: [
		CreateEmployeeComponent,
		CreateDepartmentComponent,
		DepartmentBoardComponent,
		DepartmentComponent
	],
	imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
