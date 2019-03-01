import {Component, Inject, OnInit} from '@angular/core';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';
import {MatDialog} from '@angular/material';
import {TimeslotDialogComponent} from '../timeslot-dialog/timeslot-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms: Room[];

  constructor(
    private roomService: RoomService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getRooms();
  }
  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
  openDialog(room: Room): void {
    this.roomService.getThirtyMinBookings(room).subscribe(result => {

      this.dialog.open(TimeslotDialogComponent, {
        width: '550px',
        height: '550px',
        data: {room, bookings: result}
      });
    });

  }

}


