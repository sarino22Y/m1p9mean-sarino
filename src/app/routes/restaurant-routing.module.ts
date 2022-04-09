import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RestaurantComponent } from '../components/restaurant/restaurant.component';
import { AuthGuard } from '../shared/auth/auth.guard';

const routes: Routes = [
    {path: 'restaurantliste', component: RestaurantComponent,canActivate:[AuthGuard]},
    {path: 'restaurantliste/:restaurantId/edit', component: RestaurantComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RestaurantRoutingModule { }