import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { LivraisonComponent } from '../components/livraison/livraison.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
    {path: 'livraisonliste', component: LivraisonComponent,canActivate:[AuthGuard]},
    {path: 'livraisonliste/:livraisonId/edit', component: LivraisonComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class LivraisonRoutingModule { }