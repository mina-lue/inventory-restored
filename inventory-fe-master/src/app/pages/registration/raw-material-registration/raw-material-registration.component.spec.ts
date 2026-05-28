import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialRegistrationComponent } from './raw-material-registration.component';

describe('RawMaterialRegistrationComponent', () => {
  let component: RawMaterialRegistrationComponent;
  let fixture: ComponentFixture<RawMaterialRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
