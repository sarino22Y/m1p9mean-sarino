import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { PlatRoutingModule } from './routes/plat-routing.module';

import { AppComponent } from './app.component';
import { PlatComponent } from './components/plat/plat.component';
import { PlatService } from './services/plat-service.service';

@NgModule({
  declarations: [
    AppComponent,
    PlatComponent
  ],
  imports: [
    BrowserModule,
    PlatRoutingModule,
    HttpClientModule
  ],
  providers: [PlatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
