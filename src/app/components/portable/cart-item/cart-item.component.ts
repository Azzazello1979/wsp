import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input('cartProduct') cartProduct: CartProduct[] = [];

  constructor() {}

  ngOnInit(): void {}
}
