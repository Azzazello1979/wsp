import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { environment } from 'src/environments/environment';

export interface CartProductAmountChanged {
  id: number;
  change: string;
}

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  private apiBase: string = environment.backURL;
  @Input('cartProduct') cartProduct: CartProduct;
  @Output() amountChanged = new EventEmitter<CartProductAmountChanged>();

  constructor() {}

  increaseAmount() {
    this.amountChanged.emit({ id: this.cartProduct.id, change: 'plus' });
  }

  decreaseAmount() {
    this.amountChanged.emit({ id: this.cartProduct.id, change: 'minus' });
  }

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  ngOnInit(): void {}
}
