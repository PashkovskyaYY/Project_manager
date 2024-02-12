import {Component, LOCALE_ID} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ViewComponent} from "./shell/view/view.component";
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu);
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ViewComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ]
})
export class AppComponent {
  title = 'angularProject';
}
