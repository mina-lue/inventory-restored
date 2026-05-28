import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegistationComponent } from './product-registration.component';

describe('ProductRegistationComponent', () => {
  let component: ProductRegistationComponent;
  let fixture: ComponentFixture<ProductRegistationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRegistationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRegistationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
