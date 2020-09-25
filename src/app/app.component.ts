import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './route-transition-animations';

// SERVICES
import { CentralService } from 'src/app/services/central.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [routeTransitionAnimations],
})
export class AppComponent implements OnInit {
  busy: boolean = false;
  title = 'wsp';

  constructor(
    private centralService: CentralService,
    private productService: ProductService
  ) {}

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState']
    );
  }

  ngOnInit() {
    // kick off data slurping from database
    this.productService.getProducts();

    // connect to http busy state
    this.centralService.busyState().subscribe((response) => {
      this.busy = response;
    });
  }
}
