import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page-form',
  templateUrl: './login-page-form.component.html',
  styleUrls: ['./login-page-form.component.css'],
})
export class LoginPageFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {}

  goToDashboard(token: string) {
    localStorage.setItem('token', token);
    this.loginForm.reset();
    this.router.navigate(['dashboard/home']);
  }

  onLogin() {
    this.userService
      .sendUserDataToBackEnd(
        this.loginForm.value.loginFormGroup as User,
        'login'
      )
      .subscribe(
        (response) => {
          this.goToDashboard(response.token);
        },
        (err) => console.log(err)
      );
  }

  onRegister() {
    this.userService
      .sendUserDataToBackEnd(
        this.loginForm.value.loginFormGroup as User,
        'register'
      )
      .subscribe(
        (response) => {
          this.goToDashboard(response.token);
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
