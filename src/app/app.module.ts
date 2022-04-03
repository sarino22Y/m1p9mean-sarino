import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { PlatRoutingModule } from './routes/plat-routing.module';
import { UserRoutingModule  } from './routes/user-routing.module';
import { RestaurantRoutingModule  } from './routes/restaurant-routing.module';
import { AppRoutingModule } from './routes/app-routing.module';

import { AppComponent } from './app.component';
import { PlatComponent } from './components/plat/plat.component';
import { HeaderComponent } from './components/header/header.component';
import { ErrorComponent } from './components/error/error.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    PlatComponent,
    HeaderComponent,
    ErrorComponent,
    RestaurantComponent    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PlatRoutingModule,
    UserRoutingModule,
    RestaurantRoutingModule,
    AppRoutingModule
  ],
  exports:[AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
