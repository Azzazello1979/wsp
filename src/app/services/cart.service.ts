import { Injectable } from '@angular/core';
import { Product } from 'src/app//models/Product';
import { CartProduct } from 'src/app/models/CartProduct';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpService } from 'src/app/services/abstract/http.service';
import { CentralService } from './central.service';
import { BehaviorSubject } from 'rxjs';

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
      this.bringCartTable();
    });
  }

  constructImagePath(path: string): string {
    return `${this.apiBase}/${path}`;
  }

  onCartUpdated(event) {}

  bringCartTable() {
    // backEnd call to cart route, returns cart table for user, array of product ids
    //TODO: extract user_id from token here locally
    this.getOne(28).subscribe(
      (response) => {
        this.cartProductIds = [...response];
        this.centralService.busyOFF();
        this.createCartProducts();
      },
      (err) => console.log(err)
    );
  }

  createCartProducts() {
    this.cartProducts = [];

    this.products.forEach((product) => {
      if (this.cartProductIds.includes(product.id)) {
        let aCartProduct: CartProduct = {
          id: product.id,
          name: product.name,
          unitPrice: product.price,
          amount: 0,
          totalPrice: 0,
          mainIMGurl: product.mainIMGurl,
        };
        this.cartProducts.push(aCartProduct);
        this.cartProductsChanged.next(this.cartProducts);
      }
    });
    //console.log(this.cartProducts);
    //console.log(this.cartProductIds);
  }

  cartProductsObservable() {
    return this.cartProductsChanged.asObservable();
  }
}
