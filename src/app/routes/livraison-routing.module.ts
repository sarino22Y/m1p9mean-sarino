import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { LivraisonComponent } from '../components/livraison/livraison.component';

const routes: Routes = [
    {path: 'livraisonliste', component: LivraisonComponent},
    {path: 'livraisonliste/:livraisonId/edit', component: LivraisonComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class LivraisonRoutingModule { }