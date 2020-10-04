import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  sideNavExpanded: boolean = false;
  numberOfCartItems: number = 0;
  cartProductsSub = new Subscription();

  constructor(private cartService: CartService) {}

  onHeaderClick() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  onHeaderMenuClick(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnInit() {
    this.cartProductsSub = this.cartService
      .cartProductsObservable()
      .subscribe((news) => {
        this.numberOfCartItems = news.length;
      });
  }

  ngOnDestroy() {
    this.cartProductsSub.unsubscribe();
  }
}
