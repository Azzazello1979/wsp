import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  constructor(private userService: UserService) {}

  getUsers() {
    this.userService.getUsers().subscribe(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
