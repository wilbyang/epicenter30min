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
    MaterialModule
  ],
  entryComponents: [
    TimeslotDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
