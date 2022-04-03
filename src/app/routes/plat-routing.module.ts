import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ErrorComponent } from '../components/error/error.component';

import { PlatComponent } from '../components/plat/plat.component';

const routes: Routes = [
    {path: '', component: PlatComponent},
    {path: 'platliste', component: PlatComponent},
    {path: 'platliste/:platId/edit', component: PlatComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PlatRoutingModule { }