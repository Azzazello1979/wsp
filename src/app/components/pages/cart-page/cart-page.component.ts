import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { CartService } from 'src/app/services/cart.service';
import { CartProductAmountChanged } from 'src/app/components/portable/cart-item/cart-item.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  public cartProducts: CartProduct[] = [];

  constructor(private cartService: CartService) {}

  onAmountChange(event: CartProductAmountChanged) {
    this.cartService.onAmountChange(event);
  }

  fillCartProducts() {
    this.cartService.cartProductsObservable().subscribe((news) => {
      this.cartProducts = [...news];
    });
  }

  ngOnInit() {
    this.fillCartProducts();
  }

  ngOnDestroy() {}
}
