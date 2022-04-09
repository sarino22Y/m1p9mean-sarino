import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { PlatComponent } from '../components/plat/plat.component';

const routes: Routes = [
    {path: 'user/register', component: RegisterComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'user', component: PlatComponent},   
    {path: '', component: LoginComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }