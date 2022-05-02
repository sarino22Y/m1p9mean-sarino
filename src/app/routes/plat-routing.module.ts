import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PlatComponent } from '../components/plat/plat.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { RoleGuard } from '../shared/acces/role.guard';
import { PlatSoldComponent } from '../components/plat/plat-sold/plat-sold.component';
import { PlatRemainsComponent } from '../components/plat/plat-remains/plat-remains.component';

const routes: Routes = [
    {path: 'platliste', component: PlatComponent},
    {path: 'platliste/sold', component: PlatSoldComponent},
    {path: 'platliste/remains', component: PlatRemainsComponent},
    {path: 'platliste/:platId', component: PlatComponent},

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PlatRoutingModule { }