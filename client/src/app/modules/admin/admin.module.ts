import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "@modules/admin/admin.routing";
import { SharedModule } from "@shared/shared.module";
import { CreateEmployeeComponent } from './page/create-employee/create-employee.component';
import { CreateDepartmentComponent } from './page/create-department/create-department.component';

@NgModule({
	declarations: [CreateEmployeeComponent, CreateDepartmentComponent],
	imports: [SharedModule, AdminRoutingModule]
})
export class AdminModule {}
