import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';
import {ClockService} from '../services/clock.service';

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
    private clockService: ClockService
  ) { }
  getRoom(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.roomService.getRoom(id)
      .subscribe(room => {
        console.log(room);
        this.room = room;
      });
  }
  ngOnInit() {
    this.getRoom();
    this.clockService.time.subscribe((now: Date) => {
      this.time = now;
    });
  }

}
