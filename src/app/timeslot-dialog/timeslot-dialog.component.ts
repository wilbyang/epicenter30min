import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Room} from '../models/room';
import {AvailableTimeSlot} from '../models/available-slots';
import {RoomService} from '../services/room.service';



export interface DialogData {
  room: Room;
  availableTimeSlot: AvailableTimeSlot[];

}
@Component({
  selector: 'app-timeslot-dialog',
  templateUrl: './timeslot-dialog.component.html',
  styleUrls: ['./timeslot-dialog.component.scss']
})
export class TimeslotDialogComponent implements OnInit {
  selectedSlot: number;
  phone: string;

  constructor(
    public dialogRef: MatDialogRef<TimeslotDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private roomService: RoomService,
  ) {}

  getAvailable(): void {
    console.log(this.phone);
    this.roomService.getAvailableTimeSlot(this.data.room, this.phone).subscribe(result => {
      this.data.availableTimeSlot = result.filter(r => r.open);
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    console.log(this.selectedSlot);
    console.log(this.data.room);

    this.roomService.bookRoom(this.data.room, this.selectedSlot, this.phone).subscribe(result => {
      if (result.errors) {
        console.log(result.errors);
      } else {
        location.reload();
      }
      this.dialogRef.close();
    });

  }

  ngOnInit(): void {
  }


}
