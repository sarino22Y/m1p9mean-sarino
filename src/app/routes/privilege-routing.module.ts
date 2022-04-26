import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { PrivilegeComponent } from '../components/privilege/privilege.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { RoleGuard } from '../shared/acces/role.guard';

const routes: Routes = [
    {path: 'privilegeliste', component: PrivilegeComponent,canActivate:[RoleGuard]},
    {path: 'privilegeliste/:privilegeId/edit', component: PrivilegeComponent,canActivate:[RoleGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PrivilegeRoutingModule { }