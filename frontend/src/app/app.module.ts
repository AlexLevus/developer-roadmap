import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

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
import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { MAT_RIPPLE_GLOBAL_OPTIONS } from "@angular/material/core";
import { MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";
import { ENTER } from "@angular/cdk/keycodes";

registerLocaleData(localeRu);

@NgModule({
	declarations: [AppComponent, AuthLayoutComponent, ContentLayoutComponent],
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
	providers: [
		{ provide: LOCALE_ID, useValue: "ru-RU" },
		{ provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
		{
			provide: MAT_CHIPS_DEFAULT_OPTIONS,
			useValue: {
				separatorKeyCodes: [ENTER]
			}
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
