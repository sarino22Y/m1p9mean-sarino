import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { PlatComponent } from '../components/plat/plat.component';

const routes: Routes = [
    {path: 'platliste', component: PlatComponent},
    {path: 'platliste/:platId/edit', component: PlatComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class PlatRoutingModule { }