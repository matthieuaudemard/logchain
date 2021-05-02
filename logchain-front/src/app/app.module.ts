import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import localeFr from '@angular/common/locales/fr';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PipelineOrderListComponent} from './components/pipeline-order-list/pipeline-order-list.component';
import {TimelineModule} from 'primeng/timeline';
import {SharedModule} from 'primeng/api';
import {LOCALE_ID} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {PipelineTableComponent} from "./components/pipeline-table/pipeline-table.component";
import {TableModule} from "primeng/table";
import {SelectButtonModule} from "primeng/selectbutton";
import {FormsModule} from "@angular/forms";
import { TagModule } from 'primeng/tag';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PipelineOrderListComponent,
    PipelineTableComponent,
    HeaderComponent
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
  ],
  providers: [{provide: LOCALE_ID, useValue: 'fr'}],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    registerLocaleData(localeFr, 'fr'); // passage du format de date en français
  }
}
