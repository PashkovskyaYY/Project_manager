import {Component, LOCALE_ID} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {OidcSecurityService} from "angular-auth-oidc-client";


registerLocaleData(localeRu);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ]
})
export class AppComponent{
  title = 'angularProject';

  constructor(oid: OidcSecurityService) {
    oid.getUserData().subscribe((user) => {})
    oid.checkAuth().subscribe((user) => {})
  }
}
