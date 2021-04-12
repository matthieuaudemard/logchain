import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LogOrderListComponent} from "./components/log-order-list/log-order-list.component";
import {TimelineModule} from "primeng/timeline";
import {SharedModule} from "primeng/api";
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LogOrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TimelineModule,
    SharedModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    registerLocaleData(localeFr, 'fr'); // passage du format de date en français
  }
}
