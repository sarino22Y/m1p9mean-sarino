import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { RestaurantComponent } from '../components/restaurant/restaurant.component';
import { AuthGuard } from '../shared/auth/auth.guard';
import { RoleGuard } from '../shared/acces/role.guard';

const routes: Routes = [
    {path: 'restaurantliste/:restaurantId/edit', component: RestaurantComponent,canActivate:[RoleGuard]},
    {path: 'restaurantliste', component: RestaurantComponent,canActivate:[RoleGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class RestaurantRoutingModule { }