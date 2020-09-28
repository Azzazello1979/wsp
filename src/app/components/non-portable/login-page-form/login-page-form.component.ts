import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-login-page-form',
  templateUrl: './login-page-form.component.html',
  styleUrls: ['./login-page-form.component.css'],
})
export class LoginPageFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private centralService: CentralService,
    private userService: UserService,
    private router: Router
  ) {}

  authenticatedSequence(token: string) {
    this.centralService.busyOFF();
    this.userService.setUserAuthenticationStatus(true);
    localStorage.setItem('token', token);
    this.loginForm.reset();
    this.router.navigate(['dashboard/home']);
  }

  notAuthenticatedSequence(err) {
    this.centralService.busyOFF();
    this.userService.setUserAuthenticationStatus(false);
    return console.log(err);
  }

  onLogin() {
    this.userService
      .sendUserDataToBackEnd(
        this.loginForm.value.loginFormGroup as User,
        'login'
      )
      .subscribe(
        (response) => {
          this.authenticatedSequence(response.token);
        },
        (err) => this.notAuthenticatedSequence(err)
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
          this.authenticatedSequence(response.token);
        },
        (err) => this.notAuthenticatedSequence(err)
      );
  }

  initLoginForm() {
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

  ngOnInit() {
    this.initLoginForm();
  }
}
