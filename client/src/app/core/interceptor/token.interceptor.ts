import { Injectable } from "@angular/core";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		const token = localStorage.getItem("access");

		if (token) {
			const cloned = req.clone({
				headers: req.headers.set("access-token", token)
			});
			return next.handle(cloned);
		} else {
			return next.handle(req);
		}
	}
}
