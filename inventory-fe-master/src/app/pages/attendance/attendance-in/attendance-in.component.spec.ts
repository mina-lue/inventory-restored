import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceInComponent } from './attendance-in.component';

describe('AttendanceInComponent', () => {
  let component: AttendanceInComponent;
  let fixture: ComponentFixture<AttendanceInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
