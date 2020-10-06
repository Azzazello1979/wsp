import { Component, OnInit } from '@angular/core';
import { NavigationTile } from 'src/app/models/NavigationTile';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  navigationTiles: NavigationTile[] = [
    {
      id: 1,
      name: 'Browse Products',
      path: 'dashboard/products',
      icon: 'shopping_basket',
    },
    {
      id: 2,
      name: 'My WishList',
      path: 'dashboard/wishlist',
      icon: 'star_rate',
    },
    {
      id: 3,
      name: 'My Settings',
      path: 'dashboard/user-settings',
      icon: 'build',
    },
    {
      id: 4,
      name: 'My ShoppingCart',
      path: 'dashboard/cart',
      icon: 'shopping_cart',
    },
    {
      id: 5,
      name: 'My Orders',
      path: 'dashboard/list-orders',
      icon: 'grading',
    },
    {
      id: 6,
      name: 'Manage Users',
      path: 'dashboard/manage-users',
      icon: 'escalator_warning',
    },
    {
      id: 7,
      name: 'Manage Products',
      path: 'dashboard/manage-products',
      icon: 'touch_app',
    },
    {
      id: 8,
      name: 'Manage Orders',
      path: 'dashboard/manage-orders',
      icon: 'article',
    },
  ];

  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {}

  onNavTileClick(path: string) {
    this.navigationService.updateSideNavState(path);
    this.router.navigate([path]);
  }

  ngOnInit(): void {}
}
