import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  Output, OnInit
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import {MatSidenav, MatSnackBar} from '@angular/material';
import {RoomService} from './services/room.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'EPICENTER 30min BOOKING';
  mobileQuery: MediaQueryList;
  nav = [
    {
      title: 'Rooms',
      path: '/'
    },
    {
      title: 'My Bookings',
      path: '/auth'
    }
  ];
  private readonly mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  constructor(
    private snackBar: MatSnackBar,
    changeDetectorRef: ChangeDetectorRef,
    private roomService: RoomService,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }

  ngOnInit(): void {
    this.roomService.currentErrorMsg.subscribe(msg => {
      msg && this.snackBar.open(msg, '', {
        duration: 2000,
      });
    });
  }


}
