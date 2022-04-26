import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { CommandeComponent } from '../components/commande/commande.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { RoleGuard } from '../shared/acces/role.guard';

const routes: Routes = [
    {path: 'commandeliste', component: CommandeComponent},
    {path: 'commandeliste/:commandeId', component: CommandeComponent,canActivate:[RoleGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class CommandeRoutingModule { }