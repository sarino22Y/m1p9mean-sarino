import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AccueilComponent } from '../components/shared/accueil/accueil.component';

const routes: Routes = [
    {path: '', component: AccueilComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AccueilRoutingModule { }