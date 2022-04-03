import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RestaurantComponent } from '../components/restaurant/restaurant.component';

const routes: Routes = [
    {path: 'restaurantliste', component: RestaurantComponent},
    {path: 'restaurantliste/:restaurantId/edit', component: RestaurantComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RestaurantRoutingModule { }