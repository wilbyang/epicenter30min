import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotDialogComponent } from './timeslot-dialog.component';

describe('TimeslotDialogComponent', () => {
  let component: TimeslotDialogComponent;
  let fixture: ComponentFixture<TimeslotDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeslotDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
