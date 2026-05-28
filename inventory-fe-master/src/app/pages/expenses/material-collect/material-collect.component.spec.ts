import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialCollectComponent } from './material-collect.component';

describe('MaterialCollectComponent', () => {
  let component: MaterialCollectComponent;
  let fixture: ComponentFixture<MaterialCollectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MaterialCollectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialCollectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
