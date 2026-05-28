import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsAllComponent } from './transactions-all.component';

describe('TransactionsAllComponent', () => {
  let component: TransactionsAllComponent;
  let fixture: ComponentFixture<TransactionsAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
