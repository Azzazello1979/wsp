import { Injectable } from '@angular/core';
import { Product } from 'src/app//models/Product';
import { CartProduct } from 'src/app/models/CartProduct';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/abstract/http.service';
import { CentralService } from './central.service';
import { BehaviorSubject } from 'rxjs';
import { CartProductAmountChanged } from 'src/app//components/portable/cart-item/cart-item.component';
import { ProductCardEvent } from '../components/portable/animated-card/animated-card.component';
import { ShippingOption } from '../components/pages/cart-page/cart-page.component';

export interface CartTableRecord {
  product_id: number;
  amount: number;
  selectedShippingMethod: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService extends HttpService<any> {
  public apiBase: string = environment.backURL;
  private products: Product[] = [];
  private cartProductIds: number[] = [];
  private cartProducts: CartProduct[] = [];
  private cartProductsChanged = new BehaviorSubject<CartProduct[]>(
    this.cartProducts
  );
  private selectedShippingOption: ShippingOption = null;
  private selectedShippingOptionChanged = new BehaviorSubject<ShippingOption>(
    this.selectedShippingOption
  );
  // TODO: bring this in from DB
  private shippingOptions: ShippingOption[] = [
    {
      id: 1,
      name: 'China Mail',
      price: 0,
      minDays: 14,
      maxDays: 30,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-3-icon.png',
      selected: false,
    },
    {
      id: 2,
      name: 'DHL',
      price: 29.95,
      minDays: 3,
      maxDays: 7,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-8-icon.png',
      selected: false,
    },
    {
      id: 3,
      name: 'FedEx',
      price: 25.95,
      minDays: 3,
      maxDays: 12,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-4-icon.png',
      selected: false,
    },
    {
      id: 4,
      name: 'UPS',
      price: 22.95,
      minDays: 5,
      maxDays: 10,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-5-icon.png',
      selected: false,
    },
    {
      id: 5,
      name: 'TNT',
      price: 19.95,
      minDays: 4,
      maxDays: 12,
      assetIMGpath:
        './../../../../assets/img/shippingOptions/Shipping-7-icon.png',
      selected: false,
    },
  ];
  private shippingOptionsChanged = new BehaviorSubject<ShippingOption[]>(
    this.shippingOptions
  );

  constructor(
    protected http: HttpClient,
    protected centralService: CentralService,
    protected productService: ProductService
  ) {
    super(centralService, http, 'cart');
    this.productService.productsObservable().subscribe((news) => {
      this.products = [...news];
    });
    this.bringCartTable();
  }

  shippingOptionsObservable() {
    return this.shippingOptionsChanged.asObservable();
  }

  onShippingOptionSelect(id: number) {
    this.shippingOptions.forEach((so) => {
      so.id === id
        ? ((so.selected = true), this.updateSelectedShippingOption(so))
        : (so.selected = false);
    });
    this.shippingOptionsChanged.next(this.shippingOptions);
  }

  selectedShippingOptionObservable() {
    return this.selectedShippingOptionChanged.asObservable();
  }

  updateSelectedShippingOption(shippingOption: ShippingOption) {
    this.selectedShippingOption = { ...shippingOption };
    this.selectedShippingOptionChanged.next(this.selectedShippingOption);
    //TODO: extract id of current user instead of using 28(ADMIN)
    this.patch(28, {
      selectedShippingOptionId: this.selectedShippingOption.id,
    }).subscribe(
      (response) => {
        console.log(response);
        this.centralService.busyOFF();
      },
      (err) => {
        console.log(err);
        this.centralService.busyOFF;
      }
    );
  }

  persistAmountChangeToDB(event: CartProductAmountChanged) {
    this.patch(event.id as number, { change: event.change }).subscribe(
      (response) => {
        console.log(response);
        this.centralService.busyOFF();
      },
      (err) => {
        console.log(err);
        this.centralService.busyOFF();
      }
    );
  }

  // update cartProducts amount and totalPrice locally - optimistic update
  onAmountChange(event: CartProductAmountChanged) {
    // 1st update locally
    this.cartProducts.forEach((cp) => {
      if (event.id === cp.id) {
        if (event.change === 'plus') {
          //PLUS
          cp.amount++;
          cp.totalPrice += cp.unitPrice;
          this.cartProductIds.push(event.id);
          this.cartProductsChanged.next(this.cartProducts);
          this.persistAmountChangeToDB(event);
        } else {
          //MINUS
          if (cp.amount > 1) {
            cp.amount--;
            cp.totalPrice -= cp.unitPrice;
            this.cartProductIds = [
              ...this.cartProductIds.filter((cpid) => cpid !== event.id),
            ];
            this.cartProductsChanged.next(this.cartProducts);
            this.persistAmountChangeToDB(event);
          } else {
            this.cartProducts = [
              ...this.cartProducts.filter((cp) => cp.id !== event.id),
            ];
            this.cartProductIds = [
              ...this.cartProductIds.filter((cpid) => cpid !== event.id),
            ];
            this.cartProductsChanged.next(this.cartProducts);
            this.persistAmountChangeToDB(event);
          }
        }
      }
    });

    // 2nd persist to database
    // patch! because these records already exist, just update them
  }

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  // called from animated-cart-component, adding product for the 1st time
  onAddedToCart(event: ProductCardEvent) {
    if (!this.cartProductIds.includes(event.id)) {
      // 1st update state locally - optimistic update
      let buffer: Product;
      this.products.forEach((prod) => {
        if (prod.id === event.id) {
          buffer = prod;
        }
      });
      let newCartProduct: CartProduct = {
        id: buffer.id,
        name: buffer.name,
        unitPrice: buffer.price,
        amount: 1,
        totalPrice: buffer.price,
        mainIMGurl: buffer.mainIMGurl,
      };
      this.cartProducts.push(newCartProduct);
      this.cartProductsChanged.next(this.cartProducts);
      this.cartProductIds.push(event.id);

      // 2nd update database ...
      let body = {
        user_id: 28, //TODO: extract user_id from token here locally
        product_id: event.id,
        amount: 1,
      };
      this.post(body).subscribe(
        (response) => {
          console.log(response);
          this.centralService.busyOFF();
        },
        (err) => {
          console.log(err);
          this.centralService.busyOFF();
        }
      );
    }
  }

  bringCartTable() {
    this.getOne(28).subscribe(
      (response) => {
        //console.log(response as CartTableRecord[]);
        this.createCartProduct(response as CartTableRecord[]);

        let selectedShippingMethodId: number =
          response[0].selectedShippingMethod;
        this.shippingOptions.forEach((so) => {
          so.id === selectedShippingMethodId
            ? (so.selected = true)
            : (so.selected = false);
        });
        this.shippingOptionsChanged.next(this.shippingOptions);

        this.selectedShippingOption = {
          ...this.shippingOptions.filter(
            (so) => so.id === response[0].selectedShippingMethod
          )[0],
        };
        console.log(
          'selected shipping option in cart: ',
          this.selectedShippingOption
        );
        this.selectedShippingOptionChanged.next(this.selectedShippingOption);
        this.centralService.busyOFF();
      },
      (err) => {
        console.log(err);
        this.centralService.busyOFF();
      }
    );
  }

  // create cart products on init
  createCartProduct(cartRows: CartTableRecord[]) {
    console.log(cartRows);

    cartRows.forEach((cartRow) => {
      !this.cartProductIds.includes(cartRow.product_id)
        ? this.cartProductIds.push(cartRow.product_id)
        : null;
    });
    //console.log(this.cartProductIds);

    cartRows.forEach((cr) => {
      this.products.forEach((pr) => {
        if (pr.id === cr.product_id) {
          let aCartProduct: CartProduct = {
            id: pr.id,
            name: pr.name,
            unitPrice: pr.price,
            amount: cr.amount,
            totalPrice: cr.amount * pr.price,
            mainIMGurl: pr.mainIMGurl,
          };
          this.cartProducts.push(aCartProduct);
        }
      });
    });

    this.cartProductsChanged.next(this.cartProducts);
  }

  cartProductsObservable() {
    return this.cartProductsChanged.asObservable();
  }
}
