import {RouterModule, Routes} from '@angular/router';
import {ViewComponent} from "./shell/view/view.component";
import {LoginComponent} from "./login/login.component";
import {NgModule} from "@angular/core";
import {ErrorComponent} from "./error/error.component";

export const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: ViewComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: ErrorComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
