import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from '@angular/common/http';

import { PlatRoutingModule } from './routes/plat-routing.module';
import { UserRoutingModule  } from './routes/user-routing.module';
import { RestaurantRoutingModule  } from './routes/restaurant-routing.module';
import { AppRoutingModule } from './routes/app-routing.module';
import { CommandeRoutingModule } from './routes/commande-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER, POSITION, PB_DIRECTION, } from "ngx-ui-loader";

import { AppComponent } from './app.component';
import { PlatComponent } from './components/plat/plat.component';
import { ErrorComponent } from './components/error/error.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CommandeComponent } from './components/commande/commande.component';
import { LivraisonComponent } from './components/livraison/livraison.component';
import { LivraisonRoutingModule } from './routes/livraison-routing.module';
import { FooterComponent } from './components/shared/footer/footer.component';
import { PrivilegeComponent } from './components/privilege/privilege.component';
import { PrivilegeRoutingModule } from './routes/privilege-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderloggedinComponent } from './components/shared/headers/headerloggedin/headerloggedin.component';
import { AccueilComponent } from './components/shared/accueil/accueil.component';
import { AccueilRoutingModule } from './routes/accueil-routing.module';
import { UserComponent } from './components/user/user.component';
import { RegisterrestaurantComponent } from './components/register/registerrestaurant/registerrestaurant.component';
import { RegisterekalyComponent } from './components/register/registerekaly/registerekaly.component';
import { RegisterdelivererComponent } from './components/register/registerdeliverer/registerdeliverer.component';
import { ClientdashboardComponent } from './components/dashboard/clientdashboard/clientdashboard.component';
import { RestaurantdashboardComponent } from './components/dashboard/restaurantdashboard/restaurantdashboard.component';
import { DelivererdashboardComponent } from './components/dashboard/delivererdashboard/delivererdashboard.component';
import { DashboardRoutingModule } from './routes/dashboard-routing.module';
import { MenusComponent } from './components/shared/menus/menus.component';
import { EkalydashboardComponent } from './components/dashboard/ekalydashboard/ekalydashboard.component';
import { LivraisoninfoComponent } from './components/livraison/livraisoninfo/livraisoninfo.component';
import { PendingdeliveryComponent } from './components/livraison/pendingdelivery/pendingdelivery.component';
import { DoingdeliveryComponent } from './components/livraison/doingdelivery/doingdelivery.component';
import { DonedeliveryComponent } from './components/livraison/donedelivery/donedelivery.component';
import { PlatRemainsComponent } from './components/plat/plat-remains/plat-remains.component';
import { PlatSoldComponent } from './components/plat/plat-sold/plat-sold.component';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: "red",
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.threeBounce, // background spinner type
  fgsType: SPINNER.threeStrings, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5, // progress bar thickness
  text: "Chargement...",
  maxTime: 6,
  minTime:4
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderloggedinComponent,
    MenusComponent,
    FooterComponent,
    PlatComponent,
    ErrorComponent,
    RestaurantComponent,
    CommandeComponent,
    LivraisonComponent,
    PrivilegeComponent,
    LoginComponent,
    RegisterComponent,
    AccueilComponent,
    UserComponent,
    RegisterrestaurantComponent,
    RegisterekalyComponent,
    RegisterdelivererComponent,
    ClientdashboardComponent,
    RestaurantdashboardComponent,
    DelivererdashboardComponent,
    EkalydashboardComponent,
    LivraisoninfoComponent,
    PendingdeliveryComponent,
    DoingdeliveryComponent,
    DonedeliveryComponent,
    PlatRemainsComponent,
    PlatSoldComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AccueilRoutingModule,   
    ReactiveFormsModule,
    NgSelectModule,
    HttpClientModule,
    UserRoutingModule,
    PrivilegeRoutingModule,
    PlatRoutingModule,
    RestaurantRoutingModule,
    CommandeRoutingModule,
    LivraisonRoutingModule,
    DashboardRoutingModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  exports:[AppComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
