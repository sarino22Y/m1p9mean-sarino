import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { PlatComponent } from '../components/plat/plat.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
    {path: 'user/register', component: RegisterComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'user/logout', component: LoginComponent},
    {path: 'user', component: PlatComponent,canActivate:[AuthGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }