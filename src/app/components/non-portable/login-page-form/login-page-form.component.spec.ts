import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageFormComponent } from './login-page-form.component';

describe('LoginPageFormComponent', () => {
  let component: LoginPageFormComponent;
  let fixture: ComponentFixture<LoginPageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginPageFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
