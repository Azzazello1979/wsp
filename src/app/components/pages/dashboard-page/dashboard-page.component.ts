import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  theForm: FormGroup;

  constructor() {}

  onSubmit() {
    console.log(this.theForm);
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