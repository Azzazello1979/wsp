import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdersPageComponent } from './list-orders-page.component';

describe('ListOrdersPageComponent', () => {
  let component: ListOrdersPageComponent;
  let fixture: ComponentFixture<ListOrdersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrdersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
