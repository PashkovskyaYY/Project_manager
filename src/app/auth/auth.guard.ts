import {CanActivateFn, Router, UrlTree} from '@angular/router';
import {inject} from "@angular/core";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Observable, of, switchMap} from "rxjs";

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const router = inject(Router);

  return inject(OidcSecurityService)
    .isAuthenticated()
    .pipe(switchMap((isAuthenticated) =>
      isAuthenticated
        ? of(true)
        : router.navigate(['/login'])))
};
