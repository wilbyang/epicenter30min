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
  book(room: Room): void {
    this.roomService.bookRoom(room.id).subscribe(result => {
      if (result.errors) {
        console.log(result.errors);
      }
    });
  }
  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }
  openDialog(room: Room): void {
    this.roomService.getThirtyMinBookings(room).subscribe(result => {

      const dialogRef = this.dialog.open(TimeslotDialogComponent, {
        width: '550px',
        height: '550px',
        data: {room, bookings: result}
      });

      dialogRef.afterClosed().subscribe(_ => {
        console.log('The dialog was closed');

      });
    });

  }

}


