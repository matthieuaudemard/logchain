import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TimelineModule} from 'primeng/timeline';
import {SharedModule} from 'primeng/api';
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {PipelineTableComponent} from "./components/pipeline-table/pipeline-table.component";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import {TagModule} from 'primeng/tag';
import {HeaderComponent} from './components/header/header.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {CardModule} from "primeng/card";
import {DialogModule} from "primeng/dialog";

@NgModule({
  declarations: [
    AppComponent,
    PipelineTableComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TimelineModule,
    SharedModule,
    HttpClientModule,
    TableModule,
    SelectButtonModule,
    FormsModule,
    TagModule,
    BrowserAnimationsModule,
    OverlayPanelModule,
    CardModule,
    DialogModule,
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    registerLocaleData(localeFr, 'fr'); // passage du format de date en français
  }
}
