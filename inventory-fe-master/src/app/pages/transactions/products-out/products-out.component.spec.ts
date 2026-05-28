import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOutComponent } from './products-out.component';

describe('ProductsOutComponent', () => {
  let component: ProductsOutComponent;
  let fixture: ComponentFixture<ProductsOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
