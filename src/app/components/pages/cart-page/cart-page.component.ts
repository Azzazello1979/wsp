import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartProduct } from 'src/app/models/CartProduct';
import { CartService } from 'src/app/services/cart.service';
import { CartProductAmountChanged } from 'src/app/components/portable/cart-item/cart-item.component';
import { Subscription } from 'rxjs';

export interface ShippingOption {
  id: number;
  name: string;
  price: number;
  minDays: number;
  maxDays: number;
  assetIMGpath: string;
  selected: boolean;
}

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit, OnDestroy {
  public cartProducts: CartProduct[] = [];
  private cartProductsSub = new Subscription();

  public shippingOptions: ShippingOption[] = [];
  private shippingOptionsSub = new Subscription();

  private selectedShippingOption: ShippingOption = null;

  constructor(private cartService: CartService) {}

  calculateTotalPriceWithShipping(): number {
    if (this.cartProducts.length === 0) {
      return 0;
    }

    let subTotal: number = this.calculateAllCartItemsPrice();
    let grandTotal: number = 0;
    if (this.selectedShippingOption) {
      grandTotal = this.selectedShippingOption.price + subTotal;
    } else {
      grandTotal = subTotal;
    }
    return grandTotal;
  }

  calculateAllCartItemsAmount(): number {
    let sum: number = 0;
    this.cartProducts.forEach((cp) => {
      sum += cp.amount;
    });
    return sum;
  }

  calculateAllCartItemsPrice(): number {
    let sum: number = 0;
    this.cartProducts.forEach((cp) => {
      sum += cp.totalPrice;
    });
    return parseInt(sum.toFixed(2));
  }

  onShippingOptionSelect(id: number) {
    this.cartService.onShippingOptionSelect(id);
  }

  onAmountChange(event: CartProductAmountChanged) {
    this.cartService.onAmountChange(event);
  }

  fillShippingOptions() {
    this.shippingOptionsSub = this.cartService
      .shippingOptionsObservable()
      .subscribe((news) => {
        this.shippingOptions = [...news];
        console.log('cart:', this.shippingOptions);
        this.selectedShippingOption = {
          ...this.shippingOptions.filter((so) => so.selected === true)[0],
        };
      });
  }

  fillCartProducts() {
    this.cartProductsSub = this.cartService
      .cartProductsObservable()
      .subscribe((news) => {
        this.cartProducts = [...news];
      });
  }

  ngOnInit() {
    this.fillCartProducts();
    this.fillShippingOptions();
  }

  ngOnDestroy() {
    this.cartProductsSub.unsubscribe();
    this.shippingOptionsSub.unsubscribe();
  }
}
