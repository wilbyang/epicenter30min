import {Component, Inject, OnInit} from '@angular/core';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {TimeslotDialogComponent} from '../timeslot-dialog/timeslot-dialog.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rooms: Room[];
  animal: string;
  name: string;
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
  openDialog(): void {
    const dialogRef = this.dialog.open(TimeslotDialogComponent, {
      width: '550px',
      height: '550px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}


