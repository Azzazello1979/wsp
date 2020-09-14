import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page-form',
  templateUrl: './login-page-form.component.html',
  styleUrls: ['./login-page-form.component.css'],
})
export class LoginPageFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor() {}

  onSubmit() {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginFormGroup: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(5),
        ]),
      }),
    });
  }
}
