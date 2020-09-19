import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrdersPageComponent } from './manage-orders-page.component';

describe('ManageOrdersPageComponent', () => {
  let component: ManageOrdersPageComponent;
  let fixture: ComponentFixture<ManageOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageOrdersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
