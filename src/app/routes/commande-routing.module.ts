import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { CommandeComponent } from '../components/commande/commande.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
    {path: 'commandeliste', component: CommandeComponent,canActivate:[AuthGuard]},
    {path: 'commandeliste/:commandeId/edit', component: CommandeComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class CommandeRoutingModule { }