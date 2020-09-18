import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  sideNavExpanded: boolean = false;
  busy: boolean = false;

  constructor(private userService: UserService) {}

  getUsers() {
    this.busy = !this.busy;
    this.userService.getUsers().subscribe(
      (response) => {
        console.log(response);
        this.busy = !this.busy;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onHeaderClick() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  ngOnInit() {}
}
