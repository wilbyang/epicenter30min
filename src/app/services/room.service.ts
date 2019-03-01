import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Room } from '../models/room';
import { catchError, tap } from 'rxjs/operators';
import {ThirtyMinBooking} from '../models/30min-booking';

const base64 = window.btoa('marpea:PassEpi4321');
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
  getThirtyMinBookings(room: Room): Observable<ThirtyMinBooking[]> {

    return this.http.get<ThirtyMinBooking[]>(`${baseUrl}/api/v1/room_30_min_booking/${room.id}?_format=json`, httpOptions)
      .pipe(
        tap(_ => this.log(`fetched bookings for room of ${room.id}`)),
        catchError(this.handleError('', []))
      );
  }
  bookRoom(room: Room, timeSlotId: number): Observable<any> {
    const bookSlot = {
      field_timeslots: timeSlotId,
      field_room_30_min: room.id
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

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
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
