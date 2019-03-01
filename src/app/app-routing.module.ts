import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {RoomDetailComponent} from './room-detail/room-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'room/:id', component: RoomDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
