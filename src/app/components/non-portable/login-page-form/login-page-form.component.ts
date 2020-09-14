import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page-form',
  templateUrl: './login-page-form.component.html',
  styleUrls: ['./login-page-form.component.css'],
})
export class LoginPageFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService) {}

  onSubmit() {
    this.userService
      .saveUser(this.loginForm.value.loginFormGroup as User)
      .subscribe(
        (response) => {
          console.log(response);
        },
        (err) => console.log(err)
      );
    this.loginForm.reset();
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      loginFormGroup: new FormGroup({
        name: new FormControl(null, [
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
