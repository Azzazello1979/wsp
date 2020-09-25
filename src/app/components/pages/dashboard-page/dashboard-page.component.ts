import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit {
  sideNavExpanded: boolean = false;

  constructor() {}

  onHeaderClick() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  ngOnInit() {}
}
