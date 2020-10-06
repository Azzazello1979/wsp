import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface Card {
  id: number;
  selected: boolean;
  icon: string;
  link: string;
  children: Card[];
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  sideNavExpanded: boolean = false;
  numberOfCartItems: number = 0;
  cartProductsSub = new Subscription();

  cards: Card[] = [
    {
      id: 1,
      selected: false,
      icon: 'home',
      link: 'HOME',
      children: [
        { id: 1, selected: false, icon: '', link: 'L2-donut', children: [] },
      ],
    },
    {
      id: 2,
      selected: false,
      icon: 'warning',
      link: 'WARNING',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'L2-fingerprint',
          children: [],
        },
      ],
    },
    {
      id: 3,
      selected: false,
      icon: 'edit',
      link: 'EDIT',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'L2-figure',
          children: [],
        },
        { id: 2, selected: false, icon: '', link: 'L2-alarm', children: [] },
        { id: 3, selected: false, icon: '', link: 'L2-build', children: [] },
      ],
    },
  ];

  constructor(private cartService: CartService, private router: Router) {}

  navigateToCart(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['dashboard/cart']);
  }

  onHeaderClick() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  onHeaderMenuClick(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['dashboard/home']);
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
