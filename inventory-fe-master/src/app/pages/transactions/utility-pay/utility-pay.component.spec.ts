import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityPayComponent } from './utility-pay.component';

describe('UtilityPayComponent', () => {
  let component: UtilityPayComponent;
  let fixture: ComponentFixture<UtilityPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UtilityPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilityPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
