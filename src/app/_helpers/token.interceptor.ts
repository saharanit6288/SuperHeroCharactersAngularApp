import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AccountService } from "../services/account.service";
import { Observable } from "rxjs";
import { globalVar } from "../global";

const baseApiUrl = globalVar.BASE_API_URL;

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user?.accessToken;
        const isApiUrl = request.url.startsWith(baseApiUrl);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${user.accessToken}` }
            });
        }

        return next.handle(request);
    }
}