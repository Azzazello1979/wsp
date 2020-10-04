import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  public cartProducts: CartProduct[] = [];

  constructor(private cartService: CartService) {}

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
