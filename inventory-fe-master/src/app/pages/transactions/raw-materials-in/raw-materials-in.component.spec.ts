import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsInComponent } from './raw-materials-in.component';

describe('RawMaterialsInComponent', () => {
  let component: RawMaterialsInComponent;
  let fixture: ComponentFixture<RawMaterialsInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsInComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
