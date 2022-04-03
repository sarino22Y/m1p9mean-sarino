import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { ErrorComponent } from '../components/error/error.component';

const routes: Routes = [
    {path: '**', component: ErrorComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }