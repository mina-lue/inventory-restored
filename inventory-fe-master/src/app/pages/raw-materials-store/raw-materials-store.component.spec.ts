import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawMaterialsStoreComponent } from './raw-materials-store.component';

describe('RawMaterialsStoreComponent', () => {
  let component: RawMaterialsStoreComponent;
  let fixture: ComponentFixture<RawMaterialsStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawMaterialsStoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawMaterialsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
