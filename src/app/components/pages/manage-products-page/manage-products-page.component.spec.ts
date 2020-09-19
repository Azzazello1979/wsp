import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProductsPageComponent } from './manage-products-page.component';

describe('ManageProductsPageComponent', () => {
  let component: ManageProductsPageComponent;
  let fixture: ComponentFixture<ManageProductsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageProductsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
