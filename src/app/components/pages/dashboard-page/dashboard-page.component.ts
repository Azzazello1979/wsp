import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/services/navigation.service';
import { UserService } from 'src/app/services/user.service';

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

  cards: Card[] = [];
  cardsSub = new Subscription();

  constructor(
    private cartService: CartService,
    private router: Router,
    private navigationService: NavigationService,
    private userService: UserService
  ) {}

  navigateToCart(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['dashboard/cart']);
    this.navigationService.updateSideNavState('dashboard/cart');
  }

  onHeaderClick() {
    this.sideNavExpanded = !this.sideNavExpanded;
  }

  onHomeClick(event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['dashboard/home']);
    this.navigationService.updateSideNavState('dashboard/home');
  }

  onLogoutClick(event: MouseEvent) {
    event.stopPropagation();
    this.userService.logoutUser();
  }

  ngOnInit() {
    this.cartProductsSub = this.cartService
      .cartProductsObservable()
      .subscribe((news) => {
        this.numberOfCartItems = news.length;
      });
    this.cardsSub = this.navigationService
      .cardsObservable()
      .subscribe((news) => {
        this.cards = [...news];
      });
  }

  ngOnDestroy() {
    this.cartProductsSub.unsubscribe();
    this.cardsSub.unsubscribe();
  }
}
