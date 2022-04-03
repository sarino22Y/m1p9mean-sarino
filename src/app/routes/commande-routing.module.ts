import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { CommandeComponent } from '../components/commande/commande.component';

const routes: Routes = [
    {path: 'commandeliste', component: CommandeComponent},
    {path: 'commandeliste/:commandeId/edit', component: CommandeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class CommandeRoutingModule { }