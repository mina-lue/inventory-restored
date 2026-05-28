import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceOutComponent } from './attendance-out.component';

describe('AttendanceOutComponent', () => {
  let component: AttendanceOutComponent;
  let fixture: ComponentFixture<AttendanceOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
