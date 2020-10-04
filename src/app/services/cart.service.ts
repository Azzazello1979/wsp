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

export interface CartTableRecord {
  product_id: number;
  amount: number;
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
