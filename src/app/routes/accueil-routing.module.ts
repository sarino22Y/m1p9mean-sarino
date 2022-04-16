import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AccueilComponent } from '../components/shared/accueil/accueil.component';

const routes: Routes = [
    {path: '', component: AccueilComponent},
    {path: 'm1p9mean-sarino', component: AccueilComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AccueilRoutingModule { }