import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./page/home/home.component";
import { SharedModule } from "@shared/shared.module";
import { HomeRoutingModule } from "@modules/home/home.routing";

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, SharedModule, HomeRoutingModule]
})
export class HomeModule {}
