import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetExpensesComponent } from './asset-expenses.component';

describe('AssetExpensesComponent', () => {
  let component: AssetExpensesComponent;
  let fixture: ComponentFixture<AssetExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetExpensesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
