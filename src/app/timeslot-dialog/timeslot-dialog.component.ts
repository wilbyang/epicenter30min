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
    const phone = this.phone.slice(-8);
    this.roomService.getAvailableTimeSlot(this.data.room, phone).subscribe(result => {
      this.data.availableTimeSlot = result.filter(r => r.open);
    });
  }
  onCancelClick(): void {
    this.dialogRef.close();
    this.roomService.userBooking.next(false);
  }

  onConfirmClick(): void {
    const phone = this.phone.slice(-8);
    this.roomService.bookRoom(this.data.room, this.selectedSlot, phone).subscribe(result => {
      if (result === 'operation failed') {
      } else {
        this.dialogRef.close();
        this.roomService.userBooking.next(false);
        this.roomService.currentErrorMsg.next('Booking has been received!, Reloading...');
        setTimeout(() => {
          location.reload();
        }, 2000);
      }
    });

  }


  ngOnInit(): void {
  }


}
