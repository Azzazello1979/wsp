import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './route-transition-animations';
import { CentralService } from 'src/app/services/central.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeTransitionAnimations],
})
export class AppComponent implements OnInit {
  busy: boolean = false;
  title = 'wsp';

  constructor(private centralService: CentralService) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }

  ngOnInit() {
    this.centralService.busyState().subscribe((response) => {
      this.busy = response;
    });
  }
}
