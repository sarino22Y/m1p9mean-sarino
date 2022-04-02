import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
    {path: 'user/register', component: RegisterComponent},
    {path: 'user/login', component: LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }