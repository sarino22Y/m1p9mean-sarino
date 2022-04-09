import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { PrivilegeComponent } from '../components/privilege/privilege.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
    {path: 'privilegeliste', component: PrivilegeComponent,canActivate:[AuthGuard]},
    {path: 'privilegeliste/:privilegeId/edit', component: PrivilegeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PrivilegeRoutingModule { }