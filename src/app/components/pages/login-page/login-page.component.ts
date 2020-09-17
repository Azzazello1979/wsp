import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  animate: boolean = false;

  constructor() {}

  addAnims() {
    /* this.animate = true; */
  }

  ngOnInit(): void {}
}
