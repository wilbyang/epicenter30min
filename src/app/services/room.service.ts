import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../models/room';
import { catchError, tap } from 'rxjs/operators';
import {AvailableTimeSlot} from '../models/available-slots';

const base64 = window.btoa('epipad:3picenteR!');
// const base64 = window.btoa('marpea:PassEpi4321');
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Basic ${base64}`
  })
};
// const baseUrl = 'https://epicenterstockholm.com';
const baseUrl = 'http://epicenter.local';
@Injectable({
  providedIn: 'root'
})
export class RoomService {


  constructor(
    private http: HttpClient
  ) {

  }
  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${baseUrl}/api/v1/room_for_30_min?_format=json`, httpOptions)
      .pipe(
        tap(_ => this.log('fetched rooms')),
        catchError(this.handleError('', []))
      );
  }
  getAvailableTimeSlot(room: Room, userPhone: string): Observable<AvailableTimeSlot[]> {
    const url = `${baseUrl}/api/v1/room_30_min_booking/${room.id}?phone=${userPhone}&_format=json`;
    return this.http.get<AvailableTimeSlot[]>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`fetched bookings for room of ${room.id}`)),
        catchError(this.handleError('', []))
      );
  }
  bookRoom(room: Room, timeSlotId: number, phone: string): Observable<any> {
    const bookSlot = {
      field_timeslots: timeSlotId,
      field_room_30_min: room.id,
      phone
    }
    return this.http.post<any>(`${baseUrl}/api/v1/room_for_30_min?_format=json`, bookSlot, httpOptions)
      .pipe(
        tap(_ => this.log('booking room ')),
        catchError(this.handleError('post api/v1/room_for_30_min', 'operation failed'))
      );
  }

  private log(s: string) {
    console.log(s);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error.error.message); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getRoom(id: number): Observable<Room> {
    return this.http.get<Room>(`${baseUrl}/api/v1/room_for_30_min?_format=json&roomid=${id}`, httpOptions)
      .pipe(
        tap(_ => this.log(`fetched room detail for room of ${id}`)),
        catchError(this.handleError('', null))
      );
  }
}
