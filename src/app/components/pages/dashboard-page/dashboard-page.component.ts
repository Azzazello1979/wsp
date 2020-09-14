import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  theForm: FormGroup;

  constructor(private userService: UserService) {}

  getUsers() {
    this.userService.getUsers().subscribe(
      (resposne) => {
        console.log('result of users query: ', resposne);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    // console.log(this.theForm.value.addUserForm);
    this.userService
      .post(this.theForm.value.addUserForm as User, 'users')
      .subscribe(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err);
        }
      );
    this.theForm.reset();
  }

  ngOnInit() {
    this.theForm = new FormGroup({
      addUserForm: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(3),
        ]),
      }),
    });
  }
}
