import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent {
  sideNavExpanded: boolean = false;

  onHeaderClick() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  onHeaderMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
