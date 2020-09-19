import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsforuserPageComponent } from './settingsforuser-page.component';

describe('SettingsforuserPageComponent', () => {
  let component: SettingsforuserPageComponent;
  let fixture: ComponentFixture<SettingsforuserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsforuserPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsforuserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
