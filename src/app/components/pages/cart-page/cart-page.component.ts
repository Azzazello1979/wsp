import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { CartService } from 'src/app/services/cart.service';
import { CartProductAmountChanged } from 'src/app/components/portable/cart-item/cart-item.component';

export interface ShippingOption {
  id: number;
  name: string;
  price: number;
  minDays: number;
  maxDays: number;
  assetIMGpath: string;
}

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  public shippingOptions: ShippingOption[] = [
    {
      id: 1,
      name: 'China Mail',
      price: 0,
      minDays: 14,
      maxDays: 30,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-3-icon.png',
    },
    {
      id: 2,
      name: 'DHL',
      price: 29.95,
      minDays: 3,
      maxDays: 7,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-8-icon.png',
    },
    {
      id: 3,
      name: 'FedEx',
      price: 25.95,
      minDays: 3,
      maxDays: 12,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-4-icon.png',
    },
    {
      id: 4,
      name: 'UPS',
      price: 22.95,
      minDays: 5,
      maxDays: 10,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-5-icon.png',
    },
    {
      id: 5,
      name: 'TNT',
      price: 19.95,
      minDays: 4,
      maxDays: 12,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-7-icon.png',
    },
  ];

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
