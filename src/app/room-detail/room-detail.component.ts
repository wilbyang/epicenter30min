import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';
import {ClockService} from '../services/clock.service';
import {TimeslotDialogComponent} from '../timeslot-dialog/timeslot-dialog.component';
import {MatDialog} from '@angular/material';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  time: Date;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private clockService: ClockService,
    public dialog: MatDialog
  ) { }
  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => {
        room.bookings.sort((a, b) => {
          return a.time >= b.time ? 1 : -1;
        })
        this.room = room;
      });
  }
  ngOnInit() {
    this.getRoom();
    this.clockService.time.subscribe((now: Date) => {
      this.time = now;
    });
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
