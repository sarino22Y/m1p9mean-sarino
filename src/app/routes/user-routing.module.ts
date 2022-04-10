import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { RoleGuard } from '../shared/auth/role.guard';
import { UserComponent } from '../components/user/user.component';
import { LoginekalyComponent } from '../components/login/loginekaly/loginekaly.component';
import { LoginrestaurantComponent } from '../components/login/loginrestaurant/loginrestaurant.component';
import { LogindelivererComponent } from '../components/login/logindeliverer/logindeliverer.component';
import { RegisterekalyComponent } from '../components/register/registerekaly/registerekaly.component';
import { RegisterrestaurantComponent } from '../components/register/registerrestaurant/registerrestaurant.component';
import { RegisterdelivererComponent } from '../components/register/registerdeliverer/registerdeliverer.component';

const routes: Routes = [
    {path: 'user/register', component: RegisterComponent},
    {path: 'user/registerekaly', component: RegisterekalyComponent},
    {path: 'user/registerrestaurant', component: RegisterrestaurantComponent},
    {path: 'user/registerdeliverer', component: RegisterdelivererComponent},
    {path: 'user/login', component: LoginComponent},
    {path: 'user/loginekaly', component: LoginekalyComponent},
    {path: 'user/loginrestaurant', component: LoginrestaurantComponent},
    {path: 'user/logindeliverer', component: LogindelivererComponent},
    {path: 'user/logout', component: LoginComponent},
    {path: 'users', component: UserComponent,canActivate:[RoleGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }