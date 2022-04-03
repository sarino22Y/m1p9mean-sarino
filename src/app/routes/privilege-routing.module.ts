import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { PrivilegeComponent } from '../components/privilege/privilege.component';

const routes: Routes = [
    {path: 'privilegeliste', component: PrivilegeComponent},
    {path: 'privilegeliste/:privilegeId/edit', component: PrivilegeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PrivilegeRoutingModule { }