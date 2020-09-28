import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductCardEvent } from '../components/portable/animated-card/animated-card.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: number[] = [];
  cartUpdated = new BehaviorSubject<number[]>(this.cart);

  constructor() {}

  onCartUpdated(event: ProductCardEvent) {
    const id = event.id;
    !this.cart.includes(id) ? this.cart.push(id) : null;
    this.cartUpdated.next(this.cart);
  }

  cartObservable() {
    return this.cartUpdated.asObservable();
  }
}
