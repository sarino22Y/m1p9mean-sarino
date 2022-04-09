import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { PlatRoutingModule } from './routes/plat-routing.module';
import { UserRoutingModule  } from './routes/user-routing.module';
import { RestaurantRoutingModule  } from './routes/restaurant-routing.module';
import { AppRoutingModule } from './routes/app-routing.module';
import { CommandeRoutingModule } from './routes/commande-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PlatComponent } from './components/plat/plat.component';
import { ErrorComponent } from './components/error/error.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { CommandeComponent } from './components/commande/commande.component';
import { LivraisonComponent } from './components/livraison/livraison.component';
import { LivraisonRoutingModule } from './routes/livraison-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { PrivilegeComponent } from './components/privilege/privilege.component';
import { PrivilegeRoutingModule } from './routes/privilege-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HeaderloggedinComponent } from './components/shared/headers/headerloggedin/headerloggedin.component';
import { HeadernotloggedinComponent } from './components/shared/headers/headernotloggedin/headernotloggedin.component';
import { AccueilComponent } from './components/shared/accueil/accueil.component';
import { AccueilRoutingModule } from './routes/accueil-routing.module';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderloggedinComponent,
    HeadernotloggedinComponent,
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
    UserComponent
  ],
  imports: [
    BrowserModule,
    AccueilRoutingModule,   
    ReactiveFormsModule,
    HttpClientModule,
    UserRoutingModule,
    PrivilegeRoutingModule,
    PlatRoutingModule,
    RestaurantRoutingModule,
    CommandeRoutingModule,
    LivraisonRoutingModule,
    AppRoutingModule
  ],
  exports:[AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
