import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';
import {ClockService} from '../services/clock.service';
import {TimeslotDialogComponent} from '../timeslot-dialog/timeslot-dialog.component';
import {MatDialog} from '@angular/material';
import {DatePipe, Location} from '@angular/common';

@Component({
  selector: 'app-room-detail',
  providers: [DatePipe],
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {
  room: Room;
  time: Date;
  x:any;

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private clockService: ClockService,
    private location: Location,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) { }

  goBack(): void {
    this.location.back();
  }

  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => {
        this.room = room;
        if (room.bookings.length) {
          const bookings = room.bookings.filter(b => {
            const endtime = b.time.split('-')[1];
            const now = ' ' + this.datePipe.transform(new Date(), 'H:mm');
            return endtime > now;
          });
          bookings.sort((a, b) => {
            return a.time >= b.time ? 1 : -1;
          });
          this.room.bookings = bookings;
        }
      });
  }

  ngOnInit() {
    this.getRoom();
    this.clockService.time.subscribe((now: Date) => {
      this.time = now;
    });
    this.x = setInterval(() => {
      location.reload();
    }, 1000 * 60);
  }

  openDialog(room: Room): void {
    this.dialog.open(TimeslotDialogComponent, {
      width: '550px',
      height: '550px',
      data: {room, availableTimeSlot: []}
    });
  }

}
