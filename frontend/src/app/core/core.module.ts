import { LOCALE_ID, NgModule, Optional, SkipSelf } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthGuard } from "@app/guard/auth.guard";
import { NoAuthGuard } from "@app/guard/noauth.guard";

import { throwIfAlreadyLoaded } from "@app/guard/module-import.guard";

import { TokenInterceptor } from "@app/interceptor/token.interceptor";

@NgModule({
	imports: [HttpClientModule],
	providers: [
		AuthGuard,
		NoAuthGuard,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		{ provide: LOCALE_ID, useValue: "ru-RU" }
	]
})
export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, "CoreModule");
	}
}
