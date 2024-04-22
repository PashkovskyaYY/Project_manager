import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideHttpClient, withInterceptors} from "@angular/common/http";

import {LogLevel, provideAuth} from "angular-auth-oidc-client";

import {noopInterceptor} from "./auth/auth.interceptor";
import {ViewComponent} from "./shell/view/view.component";
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";
import {authGuard} from "./auth/auth.guard";

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([noopInterceptor])),
    provideAuth({
     config: {
      authority: 'http://keycloak:8080/realms/authrealm',
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.location.origin,
      unauthorizedRoute: '/login',
      clientId: 'front-client',
      scope: 'openid email profile offline_access', // 'openid profile offline_access ' + your scopes
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 30,
       logLevel: LogLevel.Debug
     }
  }),
    provideRouter([
      {path: '', pathMatch: 'full', redirectTo: '/home'},
      {path: 'home', component: ViewComponent, canActivate: [authGuard]},
      {path: 'login', component: LoginComponent},
      {path: '**', component: ErrorComponent}
    ])
  ]
};
