import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card } from 'src/app/components/pages/dashboard-page/dashboard-page.component';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  cards: Card[] = [
    {
      id: 1,
      selected: true,
      icon: 'home',
      link: '',
      text: 'Home',
      children: [
        {
          id: 1,
          selected: true,
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
        {
          id: 2,
          selected: false,
          icon: '',
          link: 'cart',
          text: 'Courier Info',
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
  cardsChanged = new BehaviorSubject<Card[]>(this.cards);

  constructor() {}

  // set 'home' main card and subCard to selected, unselect the rest
  restoreNav() {
    this.cards.forEach((card) => {
      card.id === 1 ? (card.selected = true) : (card.selected = false);
      card.children.forEach((child) => {
        child.id === 1 ? (child.selected = true) : (child.selected = false);
      });
    });
  }

  // update sideNavState based on click on navTiles
  updateSideNavState(path: string) {
    let link: string;
    link = path.replace('dashboard/', '');
    this.cards.forEach((card) => {
      card.children.forEach((subCard) => {
        subCard.link === link
          ? ((subCard.selected = true), (card.selected = true))
          : ((subCard.selected = false), (card.selected = false));
      });
    });
    this.cardsChanged.next(this.cards);
  }

  cardsObservable() {
    return this.cardsChanged.asObservable();
  }
}
