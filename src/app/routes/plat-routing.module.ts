import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PlatComponent } from '../components/plat/plat.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { RoleGuard } from '../shared/auth/role.guard';

const routes: Routes = [
    {path: 'platliste', component: PlatComponent},
    {path: 'platliste/:platId/edit', component: PlatComponent},

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PlatRoutingModule { }