import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { DoingdeliveryComponent } from '../components/livraison/doingdelivery/doingdelivery.component';
import { DonedeliveryComponent } from '../components/livraison/donedelivery/donedelivery.component';

import { LivraisonComponent } from '../components/livraison/livraison.component';
import { LivraisoninfoComponent } from '../components/livraison/livraisoninfo/livraisoninfo.component';
import { PendingdeliveryComponent } from '../components/livraison/pendingdelivery/pendingdelivery.component';
import { LivraisonGuard } from '../shared/acces/livraison.guard';
import { RoleGuard } from '../shared/acces/role.guard';

const routes: Routes = [
    {path: 'livraisons/pending', component: PendingdeliveryComponent,canActivate:[LivraisonGuard]},
    {path: 'livraisons/doing', component: DoingdeliveryComponent,canActivate:[LivraisonGuard]},
    {path: 'livraisons/done', component: DonedeliveryComponent,canActivate:[LivraisonGuard]},
    {path: 'livraisoninfo', component: LivraisoninfoComponent,canActivate:[LivraisonGuard]},
    {path: 'livraisons', component: LivraisonComponent,canActivate:[LivraisonGuard]},
    {path: 'livraisons/:idlivraison', component: LivraisonComponent,canActivate:[LivraisonGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class LivraisonRoutingModule { }