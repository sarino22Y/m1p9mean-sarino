import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { PlatComponent } from '../components/plat/plat.component';

const routes: Routes = [
    {path: '', component: PlatComponent},
    {path: 'platliste', component: PlatComponent},
    {path: 'platliste/:platId/edit', component: PlatComponent},
    // {path: '**', component: ErrorComponent} // si error 404, on redirege l'utilisateur dans cette page.
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PlatRoutingModule { }