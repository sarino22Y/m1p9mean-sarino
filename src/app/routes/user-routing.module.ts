import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { RoleGuard } from '../shared/auth/role.guard';
import { UserComponent } from '../components/user/user.component';

const routes: Routes = [
    {path: 'user/register', component: RegisterComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'user/logout', component: LoginComponent},
    {path: 'users', component: UserComponent,canActivate:[RoleGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }