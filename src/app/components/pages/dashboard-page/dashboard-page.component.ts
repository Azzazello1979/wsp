import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

export interface Card {
  id: number;
  selected: boolean;
  icon: string;
  link: string;
  text: string;
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
      link: '',
      text: 'Home',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'home',
          text: 'Home',
          children: [],
        },
      ],
    },
    {
      id: 2,
      selected: false,
      icon: 'shopping_basket',
      link: '',
      text: 'Products',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'products',
          text: 'Products',
          children: [],
        },
      ],
    },
    {
      id: 3,
      selected: false,
      icon: 'star_rate',
      link: '',
      text: 'Wishlist',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'wishlist',
          text: 'Wishlist',
          children: [],
        },
      ],
    },
    {
      id: 4,
      selected: false,
      icon: 'build',
      link: '',
      text: 'My Settings',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'user-settings',
          text: 'My Settings',
          children: [],
        },
      ],
    },
    {
      id: 5,
      selected: false,
      icon: 'shopping_cart',
      link: '',
      text: 'Shopping Cart',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'cart',
          text: 'Shopping Cart',
          children: [],
        },
      ],
    },
    {
      id: 6,
      selected: false,
      icon: 'grading',
      link: '',
      text: 'My Orders',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'list-orders',
          text: 'My Orders',
          children: [],
        },
      ],
    },
    {
      id: 7,
      selected: false,
      icon: 'escalator_warning',
      link: '',
      text: 'Manage Users',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'manage-users',
          text: 'Manage Users',
          children: [],
        },
      ],
    },
    {
      id: 8,
      selected: false,
      icon: 'touch_app',
      link: '',
      text: 'Manage Products',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'manage-products',
          text: 'Manage Products',
          children: [],
        },
      ],
    },
    {
      id: 9,
      selected: false,
      icon: 'article',
      link: '',
      text: 'Manage Orders',
      children: [
        {
          id: 1,
          selected: false,
          icon: '',
          link: 'manage-orders',
          text: 'Manage Orders',
          children: [],
        },
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
