import {Component, OnInit} from '@angular/core';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms: Room[];

  constructor(
    private roomService: RoomService,

  ) { }

  ngOnInit() {
    this.getRooms();
  }
  getRooms(): void {
    this.roomService.getRooms()
      .subscribe(rooms => this.rooms = rooms);
  }


}


