import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Room} from '../models/room';
import {ThirtyMinBooking} from '../models/30min-booking';
import {RoomService} from '../services/room.service';



export interface DialogData {
  room: Room;
  bookings: ThirtyMinBooking[];
}
@Component({
  selector: 'app-timeslot-dialog',
  templateUrl: './timeslot-dialog.component.html',
  styleUrls: ['./timeslot-dialog.component.scss']
})
export class TimeslotDialogComponent implements OnInit {
  selectedSlot: number;

  constructor(
    public dialogRef: MatDialogRef<TimeslotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private roomService: RoomService,
    ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    console.log(this.selectedSlot);
    console.log(this.data.room);

    this.roomService.bookRoom(this.data.room, this.selectedSlot).subscribe(result => {
      if (result.errors) {
        console.log(result.errors);
      }
      this.dialogRef.close();
    });

  }

  ngOnInit(): void {
  }


}
