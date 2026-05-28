import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabourExpensesComponent } from './labour-expenses.component';

describe('LabourExpensesComponent', () => {
  let component: LabourExpensesComponent;
  let fixture: ComponentFixture<LabourExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabourExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabourExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
