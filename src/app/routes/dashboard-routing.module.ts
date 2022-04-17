import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { ClientdashboardComponent } from '../components/dashboard/clientdashboard/clientdashboard.component';
import { RestaurantdashboardComponent } from '../components/dashboard/restaurantdashboard/restaurantdashboard.component';
import { DelivererdashboardComponent } from '../components/dashboard/delivererdashboard/delivererdashboard.component';
import { EkalydashboardComponent } from '../components/dashboard/ekalydashboard/ekalydashboard.component';
import { RoleGuard } from '../shared/auth/role.guard';

const routes: Routes = [
    {path: 'client/dashboard', component: ClientdashboardComponent},
    {path: 'restaurant/dashboard', component: RestaurantdashboardComponent},
    {path: 'deliverer/dashboard', component: DelivererdashboardComponent},
    {path: 'ekaly/dashboard', component: EkalydashboardComponent, canActivate:[RoleGuard]}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule { }