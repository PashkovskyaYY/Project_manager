import { inject, Injectable, Provider } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpHeaders,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';

import { Observable, switchMap } from 'rxjs';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable()
export class NoopInterceptor implements HttpInterceptor {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    console.log('Auth Interceptor called!');

    return req.url.startsWith('/api')
      ? this.oidcSecurityService.getAccessToken().pipe(
          switchMap((token): Observable<HttpEvent<any>> => {
            console.log(token);

            const httpOptions = {
              headers: new HttpHeaders({
                Authorization: `Bearer ${token}`,
              }),
            };

            return next.handle(req.clone(httpOptions));
          }),
        )
      : next.handle(req);
  }
}

// export const noopInterceptorProvider: Provider =
//   {provide: HTTP_INTERCEPTORS, useClass: NoopInterceptor, multi: true};
export const noopInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const oidService = inject(OidcSecurityService);

  return req.url.startsWith('/api')
    ? oidService.checkAuth().pipe(
        switchMap((user) => {
          const httpOptions = {
            headers: new HttpHeaders({
              Authorization: `Bearer ${user.accessToken}`,
            }),
          };

          return next(req.clone(httpOptions));
        }),
      )
    : next(req);
};
