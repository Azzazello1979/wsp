import { Injectable } from '@angular/core';
import { ProductCardEvent } from '../components/portable/animated-card/animated-card.component';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: number[] = [];

  constructor() {}

  onCartUpdated(event: ProductCardEvent) {
    const id = event.id;
    !this.cart.includes(id) ? this.cart.push(id) : null;
    console.log(this.cart);
  }
}
