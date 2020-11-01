import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { CoreModule } from "@app/core.module";
import { SharedModule } from "@shared/shared.module";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";

import { AuthModule } from "@modules/auth/auth.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ReactiveFormsModule } from "@angular/forms";
import { GraphQLModule } from "./graphql.module";
import { HttpClientModule } from "@angular/common/http";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";

@NgModule({
	declarations: [AppComponent, AuthLayoutComponent],
	imports: [
		// angular
		BrowserModule,

		// 3rd party
		AuthModule,

		// core & shared
		CoreModule,
		SharedModule,

		// app
		AppRoutingModule,

		BrowserAnimationsModule,
		GraphQLModule,
		HttpClientModule,
		ReactiveFormsModule,
		GraphQLModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
