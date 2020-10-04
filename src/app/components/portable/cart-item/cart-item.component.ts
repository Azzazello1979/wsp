import { Component, OnInit, Input } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  private apiBase: string = environment.backURL;
  @Input('cartProduct') cartProduct: CartProduct;

  constructor() {}

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  ngOnInit(): void {}
}
