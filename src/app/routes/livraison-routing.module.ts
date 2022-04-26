import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { LivraisonComponent } from '../components/livraison/livraison.component';
import { LivraisoninfoComponent } from '../components/livraison/livraisoninfo/livraisoninfo.component';
import { LivraisonGuard } from '../shared/acces/livraison.guard';
import { RoleGuard } from '../shared/acces/role.guard';

const routes: Routes = [
    {path: 'livraisoninfo', component: LivraisoninfoComponent,canActivate:[LivraisonGuard]},
    {path: 'livraisons', component: LivraisonComponent,canActivate:[RoleGuard]},
    {path: 'livraisons/:idlivraison', component: LivraisonComponent,canActivate:[LivraisonGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class LivraisonRoutingModule { }