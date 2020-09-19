import { Component, OnInit } from '@angular/core';
import { NavigationTile } from 'src/app/models/NavigationTile';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  navigationTiles: NavigationTile[] = [
    {
      name: 'Browse Products',
      path: 'dashboard/products',
      icon: 'shopping_basket',
    },
    { name: 'My WishList', path: 'dashboard/wishlist', icon: 'star_rate' },
    { name: 'My Settings', path: 'dashboard/user-settings', icon: 'build' },
    { name: 'My ShoppingCart', path: 'dashboard/cart', icon: 'shopping_cart' },
    { name: 'My Orders', path: 'dashboard/list-orders', icon: 'grading' },
    {
      name: 'Manage Users',
      path: 'dashboard/manage-users',
      icon: 'escalator_warning',
    },
    {
      name: 'Manage Products',
      path: 'dashboard/manage-products',
      icon: 'touch_app',
    },
    { name: 'Manage Orders', path: 'dashboard/manage-orders', icon: 'article' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
