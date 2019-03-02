import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { TimeslotDialogComponent } from './timeslot-dialog/timeslot-dialog.component';
import {FormsModule} from '@angular/forms';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TimeslotDialogComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    TimeslotDialogComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
